'use strict';

angular.module('threeViewer.services', [])

    // For this example this is consumed by the directive and
    // the model factory.
    .service('SceneService', function () {
        return {
            scene: new THREE.Scene()
        }
    })

    // Returns a single instance of a camera.  Consumed by directive and controls.
    .service('CameraService', function () {
        // default values for camera
        var viewAngle = 35;
        //var aspectRatio = window.innerWidth / window.innerHeight;
        var aspectRatio = 12 / 9;
        var near = 0.1
        var far = 15000;

        return {
            perspectiveCam: new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far)
        }
    })

    // This gets data from the $httpBackend set up in app.js.
    // One of the many cool things you can do with $httpBackend besides
    // unit testing.
    .service('ModelDataService', ['$http', function ($http) {
        this.getData = function (fname) {
            return $http({
                method: 'GET',
                url: fname
            });
        }
    }])

    // Adds a new model to the viewer with the provided x, y offset from the UI.  This specific model
    // creates a tube that follows a collection of 3d points.
    .service('ModelFactory', ['SceneService', 'ModelDataService', function (SceneService, ModelDataService) {
        this.addModel = function (xOffset, yOffset) {

            ModelDataService.getData('data/model1.json').then(function (dataResponse) {

                var splinePoints = [];
                var path = dataResponse.data;

                // creates the path with the provided json data
                for (var i = 0; i < path.points.length; i++) {
                    splinePoints.push(new THREE.Vector3(path.points[i].x + xOffset, path.points[i].y + yOffset, path.points[i].z));
                }

                var curve = new THREE.SplineCurve3(splinePoints);
                curve.dynamic = true;

                var segments = 300;
                var tubeRadius = 2;
                var radiusSegments = 6;
                var closedTube = false;
                var debug = false;

                // create a tube with a wireframe that follows thes provided spline path
                var tubeGeometry = new THREE.TubeGeometry(curve, segments, tubeRadius, radiusSegments, closedTube, debug);
                var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                var graphMesh = new THREE.Mesh(tubeGeometry, material);

                // add to the scene
                SceneService.scene.add(graphMesh);
            });
        }
    }])

    .service('CowFactory', ['$rootScope','SceneService', 'CameraService', 'ModelDataService', function ($rootScope,SceneService, CameraService, ModelDataService) {

        var zMesh = {};

        this.clearScene = function(renderer) {
          if(SceneService.scene.children.length > 0) {
            SceneService.scene.children.forEach(function(v,i) {
              console.log('removing '+v.name);
              //SceneService.scene.remove(v);
              disposeNode(v);
            });

          }

          function disposeNode(node) {
             if (node instanceof THREE.Mesh) {
               if (node.geometry) {
                 node.geometry.dispose();
                 node.geometry = undefined; // fixed problem
               }

               if (node.material) {
                 if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
                   node.material.materials.forEach( function(mtrl, idx) {
                     if (mtrl.map) mtrl.map.dispose();
                     if (mtrl.lightMap) mtrl.lightMap.dispose();
                     if (mtrl.bumpMap) mtrl.bumpMap.dispose();
                     if (mtrl.normalMap) mtrl.normalMap.dispose();
                     if (mtrl.specularMap) mtrl.specularMap.dispose();
                     if (mtrl.envMap) mtrl.envMap.dispose();

                     mtrl.dispose();
                     mrtl = undefined; // fixed problem
                   } );
                 }
                 else {
                   if (node.material.map) node.material.map.dispose();
                   if (node.material.lightMap) node.material.lightMap.dispose();
                   if (node.material.bumpMap) node.material.bumpMap.dispose();
                   if (node.material.normalMap) node.material.normalMap.dispose();
                   if (node.material.specularMap) node.material.specularMap.dispose();
                   if (node.material.envMap) node.material.envMap.dispose();

                   node.material.dispose();
                   node.material = undefined; // fixed problem
                 }
               }
             }
             console.log('node before removal: ', node);
             SceneService.scene.remove( node );
             renderer.dispose(); // ***EDIT*** improved even memory more original scene heap is 12.4 MB; add objects increases to 116 MB or 250 MB (different models), clearing always brings down to 13.3 MB ... there still might be some artifacts.
             node = undefined; // unnecessary
           }

        }

        this.moveModel = function(pos) {
          if(zMesh.hasOwnProperty('position')) {
            zMesh.position.set(pos.xOffset, pos.yOffset, pos.zOffset );
          }
        }

        this.addModel = function (args) {

            ModelDataService.getData(args.path).then(function (dataResponse) {

                //var model = dataResponse.data;
                var model=(args.path);

                var manager = new THREE.LoadingManager();

                manager.onStart = function ( item, loaded, total ) {
                  $rootScope.$apply(function() {
                    $rootScope.load3D.status = 'loading';
                    $rootScope.load3D.items = loaded;
                  });
                  console.log(item, loaded, total);
                };
                manager.onProgress = function (item, loaded, total) {
                  $rootScope.$apply(function() {
                    $rootScope.load3D.items = loaded;
                  });
                  console.log(item, loaded, total);
                };
                manager.onLoad = function () {
                  $rootScope.$apply(function() {
                    $rootScope.load3D.status = 'loaded';
                  });
                  console.log('all items loaded');
                };
                manager.onError = function () {
                  $rootScope.$apply(function() {
                    $rootScope.load3D.status = 'load error';
                  });
                  console.log('there has been an error');
                };

                var loader = new THREE.JSONLoader(manager);
              	var position = new THREE.Vector3();

              	var createMesh = function( geometry,materials)	{

                  //materials[0].normalScale = new THREE.Vector2(1,1);
                  //geometry.computeVertexNormals();

              		zMesh = new THREE.Mesh( geometry,new THREE.MeshFaceMaterial( materials ));
              		zMesh.name='cow';
              		//zMesh.shading = THREE.FlatShading;
                  zMesh.shading = THREE.SmoothShading;
              		zMesh.overdraw = true;
              		zMesh.needsUpdate = true

              		zMesh.position.set(args.xOffset, args.yOffset, args.zOffset);
              		zMesh.rotation.set( args.xRot, args.yRot, args.zRot );
              		zMesh.scale.set(args.scale, args.scale, args.scale );
              		zMesh.centroid = new THREE.Vector3();
              		zMesh.centroid = getMeshCentroid(zMesh);

                  //uncomment to show model bounding box
                  /*
              		geometry.computeBoundingBox();
              		var bbox = new THREE.BoundingBoxHelper( zMesh, 0xcc0000 );
              		bbox.update();
              		SceneService.scene.add( bbox );
                  */
                  //clearScene();

                  SceneService.scene.add(zMesh);

              	};

                var getMeshCentroid = function(mesh) {

              		var c = new THREE.Vector3();
              		mesh.geometry.computeBoundingBox();
              		c.addVectors(
                          mesh.geometry.boundingBox.min,
                          mesh.geometry.boundingBox.max
                      );
                     c.divideScalar(2);

              	   console.log("Box Min: "+mesh.geometry.boundingBox.min.x+", "+mesh.geometry.boundingBox.min.y+", "+mesh.geometry.boundingBox.min.z);
              	   console.log("Box Max: "+mesh.geometry.boundingBox.max.x+", "+mesh.geometry.boundingBox.max.y+", "+mesh.geometry.boundingBox.max.z);

              		return c;

              	}

                if(typeof SceneService.scene.getObjectByName( "cow" ) == 'undefined') {
		                loader.load( model, createMesh );
                  }

            });

        }
    }]);

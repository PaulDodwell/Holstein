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

                manager.onProgress = function (item, loaded, total) {
                  $rootScope.$apply(function() {
                    $rootScope.loadStatus = 'loading';
                  });
                  console.log(item, loaded, total);
                };
                manager.onLoad = function () {
                  $rootScope.$apply(function() {
                    $rootScope.loadStatus = 'loaded';
                  });
                  console.log('all items loaded');
                };
                manager.onError = function () {
                  $rootScope.$apply(function() {
                    $rootScope.loadStatus = 'load error';
                  });
                  console.log('there has been an error');
                };

                var loader = new THREE.JSONLoader(manager);
              	var position = new THREE.Vector3();

              	var createMesh = function( geometry,materials)	{

              		geometry.computeVertexNormals();

              		zMesh = new THREE.Mesh( geometry,new THREE.MeshFaceMaterial( materials ));
              		zMesh.name='Ideal Holstein Cow';
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
                  SceneService.scene.add(zMesh);

                  loadLightAmbient(SceneService.scene);
                  loadLight1(SceneService.scene);
                  loadLight2(SceneService.scene);
                  //loadLight3(SceneService.scene);
                  //loadLight4(SceneService.scene);

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

                var loadLightAmbient = function(scene) {
                  var light1 = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
                  scene.add( light1 );
                  return;
                }

                var loadLight1 = function(scene) {
              		var light1 = new THREE.DirectionalLight( 0xd9d9d9, 0.5 );
              		light1.position.set(-1, 1, 0 );
              		scene.add( light1 );
                  return;
              	}

                var loadLight2 = function(scene) {
              		var light1 = new THREE.DirectionalLight( 0xd9d9d9, 0.5 );
              		light1.position.set( 1, -1, 0 );
              		scene.add( light1 );
                  return;
              	}

                var loadLight3 = function(scene) {
              		var light1 = new THREE.DirectionalLight( 0xffffff, 0.7 );
              		light1.position.set(-1, -1, 0 );
              		scene.add( light1 );
                  return;
              	}

                var loadLight4 = function(scene) {
              		var light1 = new THREE.DirectionalLight( 0xffffff, 0.7  );
              		light1.position.set( 1, 1, 0 );
              		scene.add( light1 );
                  return;
              	}

		            loader.load( model, createMesh );

            });

        }
    }]);

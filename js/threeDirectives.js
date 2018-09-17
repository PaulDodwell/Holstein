'use strict';

angular.module('threeViewer.directives', ['threeViewer.services'])

  .directive('threeViewport', ['SceneService', 'CameraService', function (SceneService, CameraService) {
      return {
          restrict: "AE",
          scope: {
            cow3d: '=',
            set3d: '=',
            controls: '='
          },
          controller: function ($scope, $element) {

              var renderer,material,geometry,mesh;

              $element.ready(function() {
                init($element);
                loadLightAmbient(SceneService.scene);
                loadLight1(SceneService.scene);
                loadLight2(SceneService.scene);
                animate();
              });

              function init(el) {

                  // Add the camera
                  CameraService.perspectiveCam.position.set(0, 0, $scope.set3d.camZ);
                  CameraService.perspectiveCam.aspect = $scope.set3d.aspect;

                  SceneService.scene.add(CameraService.perspectiveCam);

                  /* uncomment to add test cube - pjd
                  geometry = new THREE.BoxGeometry(100,100,100,10,10,10);

                  material = new THREE.MeshBasicMaterial({
                      color: 0x00ff00,
                      wireframe: true
                  });

                  mesh = new THREE.Mesh(geometry, material);
                  SceneService.scene.add(mesh);
                  */

                  // create the renderer
                  renderer = new THREE.WebGLRenderer({ antialias: true });
                  renderer.setSize(el[0].offsetWidth, el[0].offsetWidth * (1 / $scope.set3d.aspect));
                  renderer.setClearColor(new THREE.Color($scope.set3d.colorBG), $scope.set3d.opacityBG);
                  rendererResize();
                  // set up the controls with the camera and renderer
                  $scope.controls = new THREE.OrbitControls(CameraService.perspectiveCam, renderer.domElement);
                  //controls.target.set(camX, camY, 0);
                  $scope.controls.autoRotate = $scope.set3d.autoRotate;
                  $scope.controls.autoRotateSpeed = $scope.set3d.autoRotateSpeed;
                  $scope.controls.rotateSpeed = $scope.set3d.rotateSpeed;
                  $scope.controls.enableDamping = $scope.set3d.enableDamping;
                  $scope.controls.dampingFactor = $scope.set3d.dampingFactor;
                  $scope.controls.enablePan = $scope.set3d.enablePan;
                  $scope.controls.maxDistance = $scope.set3d.maxDistance;
                  $scope.controls.minDistance = $scope.set3d.minDistance;
                  $scope.controls.update();
                  // add renderer to DOM
                  el[0].appendChild(renderer.domElement);

                  // handles resizing the renderer when the window is resized
                  window.addEventListener('resize', rendererResize, false);
              }

              function animate() {
                  requestAnimationFrame(animate);
                  renderer.render(SceneService.scene, CameraService.perspectiveCam);
                  $scope.controls.update();
              }

              function rendererResize(force) {
                console.log("renderer width: "+$element[0].offsetWidth);
                var canvas = renderer.domElement;
                var width = $element[0].offsetWidth;
                var height = window.innerHeight * 0.7;

                if (force || canvas.width !== width || canvas.height !== height) {
                  renderer.setSize(width, height);
                  var camZ = width < 450 ? $scope.set3d.camPhoneZ : $scope.set3d.camZ;
                  CameraService.perspectiveCam.position.set(0, 0, camZ);
                  CameraService.perspectiveCam.aspect = width / height;
                  CameraService.perspectiveCam.updateProjectionMatrix();
                }
              }

              var loadLightAmbient = function(scene) {
                if(typeof SceneService.scene.getObjectByName( "LX_Ambient" ) == 'undefined') {
                  var lxAmbient = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
                  lxAmbient.name = 'LX_Ambient';
                  scene.add( lxAmbient );
                }
                return;
              }

              var loadLight1 = function(scene) {
                if(typeof SceneService.scene.getObjectByName( "LX_1" ) == 'undefined') {
                  var lx1 = new THREE.DirectionalLight( 0xd9d9d9, 0.5 );
                  lx1.name = 'LX_1';
                  lx1.position.set(-1, 1, 0 );
                  scene.add( lx1 );
                }
                return;
              }

              var loadLight2 = function(scene) {
                if(typeof SceneService.scene.getObjectByName( "LX_2" ) == 'undefined') {
                  var lx2 = new THREE.DirectionalLight( 0xd9d9d9, 0.5 );
                  lx2.name = 'LX_2';
                  lx2.position.set( 1, -1, 0 );
                  scene.add( lx2 );
                }
                return;
              }
          }
      }
  }
  ]);

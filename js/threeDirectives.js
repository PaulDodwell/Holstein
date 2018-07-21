'use strict';

angular.module('threeViewer.directives', ['threeViewer.services'])
    // Creates the directive (reusable chunk of html and javascript) for three.js.
    // Note that right now the SceneService and CameraService are injected into the directive.  These
    // services are used to manipulate the scene else where.
    // Currently the Renderer and controls are part of the directive but could just as easily be
    // moved into their own services if functionality they provide need to be manipulated by a UI control.
  .directive('xthreeViewport', ['SceneService', 'CameraService', function (SceneService, CameraService) {
      return {
          restrict: "AE",

          link: function (scope, element, attribute) {

              var camX = scope.$eval(attribute.camX);
              var camY = scope.$eval(attribute.camY);
              var camZ = scope.$eval(attribute.camZ);

              var renderer,material,geometry,mesh;

              element.ready(function() {
                init(element);
                animate();
              });

              function init(element) {

                  // Add the camera
                  CameraService.perspectiveCam.position.set(0, 0, 80);
                  CameraService.perspectiveCam.aspect = scope.set3d.aspect;
                  SceneService.scene.add(CameraService.perspectiveCam);

                  /* uncomment to add test cube
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
                  renderer.setSize(element[0].offsetWidth, element[0].offsetWidth * (1 / scope.set3d.aspect));
                  renderer.setClearColor(new THREE.Color(scope.set3d.colorBG), scope.set3d.opacityBG);

                  // set up the controls with the camera and renderer
                  scope.controls = new THREE.OrbitControls(CameraService.perspectiveCam, renderer.domElement);
                  //controls.target.set(camX, camY, 0);
                  scope.controls.autoRotate = scope.set3d.autoRotate;
                  scope.controls.autoRotateSpeed = scope.set3d.autoRotate;
                  scope.controls.rotateSpeed = scope.set3d.rotateSpeed;
                  scope.controls.enableDamping = scope.set3d.enableDamping;
                  scope.controls.dampingFactor = scope.set3d.dampingFactor;
                  scope.controls.update();

                  // add renderer to DOM
                  element[0].appendChild(renderer.domElement);

                  // handles resizing the renderer when the window is resized
                  window.addEventListener('resize', onWindowResize, false);
              }

              function animate() {
                  requestAnimationFrame(animate);
                  renderer.render(SceneService.scene, CameraService.perspectiveCam);
                  scope.controls.update();
              }

              function onWindowResize(event) {
                console.log("renderer width: "+element[0].offsetWidth);
                  renderer.setSize(element[0].offsetWidth, element[0].offsetWidth * (1 / scope.set3d.aspect));
                  CameraService.perspectiveCam.aspect = scope.set3d.aspect;
                  CameraService.perspectiveCam.updateProjectionMatrix();
              }
          }
      }
  }
  ])
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
                animate();
              });

              function init(el) {

                  // Add the camera
                  CameraService.perspectiveCam.position.set(0, 0, $scope.set3d.camZ);
                  CameraService.perspectiveCam.aspect = $scope.set3d.aspect;
                  SceneService.scene.add(CameraService.perspectiveCam);

                  /* uncomment to add test cube
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

                  // set up the controls with the camera and renderer
                  $scope.controls = new THREE.OrbitControls(CameraService.perspectiveCam, renderer.domElement);
                  //controls.target.set(camX, camY, 0);
                  $scope.controls.autoRotate = $scope.set3d.autoRotate;
                  $scope.controls.autoRotateSpeed = $scope.set3d.autoRotateSpeed;
                  $scope.controls.rotateSpeed = $scope.set3d.rotateSpeed;
                  $scope.controls.enableDamping = $scope.set3d.enableDamping;
                  $scope.controls.dampingFactor = $scope.set3d.dampingFactor;
                  $scope.controls.update();
                  // add renderer to DOM
                  el[0].appendChild(renderer.domElement);

                  // handles resizing the renderer when the window is resized
                  window.addEventListener('resize', onWindowResize, false);
              }

              function animate() {
                  requestAnimationFrame(animate);
                  renderer.render(SceneService.scene, CameraService.perspectiveCam);
                  $scope.controls.update();
              }

              function onWindowResize(event) {
                console.log("renderer width: "+$element[0].offsetWidth);
                  renderer.setSize($element[0].offsetWidth, $element[0].offsetWidth * (1 / $scope.set3d.aspect));
                  CameraService.perspectiveCam.aspect = $scope.set3d.aspect;
                  CameraService.perspectiveCam.updateProjectionMatrix();
              }
          }
      }
  }
  ]);

'use strict';
angular.module('threeViewer.controllers', ['threeViewer.services'])

  // Control that manages changes to the 3d scene
.controller('SceneControl', ['$scope', '$rootScope', 'CowFactory', 'CameraService', 'SceneService',
    function ($scope, $rootScope, CowFactory, CameraService, SceneService) {

        $scope.set3d = {
          aspect:1.5556,
          autoRotate: false,
          autoRotateSpeed: 1.5,
          rotateSpeed: 0.17,
          enableDamping: true,
          dampingFactor: 0.23,
          enablePan: true,
          maxDistance:240,
          minDistance:45,
          colorBG: 0xffffff,
          hexColorBG: '#ffffff',
          opacityBG: 1,
          camZ: 110,
          camPhoneZ: 160
        }

        $scope.manager = {};

        $scope.controls = {};

        $scope.addModel = function () {
            CowFactory.addModel($scope.cow3D);
        }

        $scope.toggleRotate = function(objName) {
          if(!$scope.controls.autoRotate) {
            $scope.controls.reset();
          }
          $scope.controls.autoRotate = !$scope.controls.autoRotate;
          $scope.controls.update();
        }

        // brings camera out
        $scope.increaseCameraZ = function () {
            CameraService.perspectiveCam.position.z += 2;
        }

        //brings camera in
        $scope.decreaseCameraZ = function () {
            CameraService.perspectiveCam.position.z -= 2;
        }

        $scope.$watch('cow3D',function(val) {
          CowFactory.moveModel(val);
        },true);

        $scope.addModel();

    }]);

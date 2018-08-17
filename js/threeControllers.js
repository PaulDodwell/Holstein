'use strict';
angular.module('threeViewer.controllers', ['threeViewer.services'])

  // Control that manages changes to the 3d scene
.controller('SceneControl', ['$scope', '$rootScope', 'CowFactory', 'CameraService',
    function ($scope, $rootScope, CowFactory, CameraService) {

        $scope.set3d = {
          aspect:1.25,
          autoRotate: false,
          autoRotateSpeed: 1.5,
          rotateSpeed: 0.17,
          enableDamping: true,
          dampingFactor: 0.23,
          enablePan: false,
          maxDistance:240,
          minDistance:45,
          colorBG: 0xffffff,
          hexColorBG: '#ffffff',
          opacityBG: 1,
          camZ: 100
        }

        $scope.manager = {};

        $scope.controls = {};

        $scope.addModel = function () {
            //CowFactory.clearScene();
            CowFactory.addModel($scope.cow3D);
        }

        $scope.toggleRotate = function() {
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

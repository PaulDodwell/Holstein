'use strict';
angular.module('threeViewer.controllers', ['threeViewer.services'])

  // Control that manages changes to the 3d scene
.controller('SceneControl', ['$scope', '$rootScope', 'ModelFactory', 'CameraService',
    function ($scope, $rootScope, ModelFactory, CameraService) {
        $scope.data = {};
        $scope.data.xOffset = 0;
        $scope.data.yOffset = 0;

        //alert("SceneControl Init "+$rootScope.menuState.inner);

        // adds new models at the provided offset
        $scope.addModel = function () {
            ModelFactory.addModel($scope.data.xOffset, $scope.data.yOffset);
        }

        // brings camera out
        $scope.increaseCameraZ = function () {
            CameraService.perspectiveCam.position.z += 50;
        }

        //brings camera in
        $scope.decreaseCameraZ = function () {
            CameraService.perspectiveCam.position.z -= 50;
        }
    }])
  .controller('threeTstCtrl',['$scope','$rootScope',function ($scope, $rootScope) {
    	alert("Three Viewer Init "+$rootScope.menuState.inner);
    }]);

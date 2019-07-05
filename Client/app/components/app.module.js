 // Include app dependency on ngMaterial
 var app = angular.module('YourApp', ['ngMaterial', 'ngMessages'])

    .controller('TitleController', function($scope) {
        $scope.title = 'My App Title';
      })
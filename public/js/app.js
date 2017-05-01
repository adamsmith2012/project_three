var app = angular.module('ThroneApp', []);

app.controller('ThroneController', ['$http', function($http){
      var controller = this;
      $http({
        method:'GET',
        url:'https://api.got.show/api/characters/find',
        data : {
          count : this
        }
      })

   }]);
   

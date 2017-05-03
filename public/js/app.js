var app = angular.module('ThroneApp', []);

app.controller('ThroneController', ['$http', function($http){
      var controller = this;
      $http({
        method:'GET',
        url:'https://api.got.show/api/characters/',
        data : {
          house : this.house,
          name: this.name,
          books: this.books,
          title: this.title
        }
      })

   }]);

//Enabling one page routing for landing page-tentative
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
   $locationProvider.html5Mode({enabled:true});
   $routeProvider.when('/url1', { //route would come from controller file with routes
      template: '<h2>This is the the URL1 Section</h2>',
      controller: function(){
         this.foo = 'bar';
      },
      controllerAs: 'main'
   });
}]);

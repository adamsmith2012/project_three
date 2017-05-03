var app = angular.module('ThroneApp', ['ngRoute']);

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

  /**** USER ****/

  // What user will look like after successful log in
  this.user = {
    _id: "",
    name: "",
    image: "",
    houses: [],
    username: ""
  }

  this.createUser = function() {
    $http({ // Makes HTTP request to server
      method: 'POST',
      url: '/users',
      data: { // Gets turned into req.body
        name: controller.newUserName,
        username: controller.newUserUsername,
        password: controller.newUserPassword
      }
    }).then(function(response) {
      controller.logInUsername = controller.newUserUsername;
      controller.logInPassword = controller.newUserPassword;
      controller.logIn();
      // controller.getHouses(); // 3) Updates page
    });
  }

  this.logIn = function() {
    $http({ // Makes HTTP request to server
      method: 'POST',
      url: '/sessions',
      data: { // Gets turned into req.body
        username: controller.logInUsername,
        password: controller.logInPassword
      }
    }).then(function(response) {
      controller.user = response.data;
      // controller.getHouses(); // 3) Updates page
    });
  }

}]);

//========================
// HOUSE CONTROLLER
//========================
app.controller('HouseController', ['$http', function($http) {
  var controller = this;
  //======================================
  // 1) Create House Data
//======================================
  this.createHouses = function() {
    $http({ // Makes HTTP request to server
      method: 'POST',
      url: '/houses',
      data: { // Gets turned into req.body
        name:this.name,
        img: this.img,
        region: this.region
      }
    }).then(function(response) {
      controller.getHouses(); // 3) Updates page on Houses creation
    });
  };
//======================================
  // 4) Deletes House Data
//======================================
  this.deleteHouse = function(id) {
    $http({
      method:'DELETE',
      url:'/houses/' + id
    }).then(function(response) {
      controller.getHouses(); // 5) Updates page on Houses deletion
    });
  };
//======================================
  // 6) Updates House Data
//======================================
this.updateHouse = function(House) {
  console.log(House);
  // var newHouse = {
  //   name: this.newName,
  //   img: this.newImg,
  // }
  $http({
    method:'PUT',
    url:'/houses/' + House._id,
    data: House
  }).then(function(response) {
    controller.editableHousesId = null;
    controller.getHouses(); // 7) Updates page on House update
  });
};
//======================================
  // 2) Get Houses Data
//======================================
  this.getHouses = function() {
    $http({
      method:'GET',
      url: '/houses'
    }).then(function(response) {
      console.log(response);
      controller.houses = response.data
    });
  };
  this.getHouses();
}]);

/****** ROUTER ******/
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

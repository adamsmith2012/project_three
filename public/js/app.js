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

  //=================================
  // USER SECTION
  //=================================

  // What user will look like after successful log in
  this.user = {
    _id: "",
    name: "",
    image: "",
    houses: [],
    username: ""
  }

  //=================================
  // Get Current User
  //=================================
  this.getCurrentUser = function() {
    $http({ // Makes HTTP request to server
      method: 'GET',
      url: '/users/' + controller.user._id,
    }).then(function(response) {
      controller.user = response.data;
    });
  }

  //=================================
  // Create User
  //=================================
  this.createUser = function() {
    $http({ // Makes HTTP request to server
      method: 'POST',
      url: '/users',
      data: { // Gets turned into req.body
        name: controller.newUserName,
        image: controller.newUserImage,
        username: controller.newUserUsername,
        password: controller.newUserPassword
      }
    }).then(function(response) {
      controller.logInUsername = controller.newUserUsername;
      controller.logInPassword = controller.newUserPassword;
      controller.newUserName = controller.newUserUsername = controller.newUserPassword = "";
      controller.logIn();
    });
  }

  //=================================
  // Log user in
  //=================================
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
      controller.logInUsername = controller.logInPassword = "";
    });
  }

  //=================================
  // HOUSE SECTION
  //=================================

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
      controller.getCurrentUser();
      // controller.getHouses(); // 3) Updates page on Houses creation
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
      controller.getCurrentUser(); // 5) Updates page on Houses deletion
    });
  };
  //======================================
  // 7) SHOWS EDIT FORM
  //======================================
  this.showEditForm = function(id) { // SHOW FUNCTION to update house on click
    // console.log(id);
    this.editableHousesId = id // Whatever is being clicked
  };
  //======================================
  // 6) Updates House Data
  //======================================
  this.updateHouse = function(house) {
    // console.log(house);
    // var newHouse = {
    //   name: this.newName,
    //   img: this.newImg,
    // }
    $http({
      method:'PUT',
      url:'/houses/' + house._id,
      data: house
    }).then(function(response) {
      controller.editableHousesId = null;
      controller.getCurrentUser(); // 7) Updates page on House update
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
      controller.houses = response.data;
    });
  };
  this.getHouses();

  //=================================
  // CHARACTER SECTION
  //=================================
  this.getCharacters = function() {
    $http({
      method:'GET',
      url: 'https://api.got.show/api/characters'
    }).then(function(response) {
      controller.characters = response.data;
    });
  };
  this.getCharacters();

  //=================================
  // Add Character
  //=================================
  this.addCharacter = function(newChar, houseId) {
    $http({ // Makes HTTP request to server
      method: 'POST',
      url: '/characters',
      data: { // Gets turned into req.body
        name: newChar.name,
        img: newChar.imageLink,
        title: newChar.titles,
        house: newChar.house,
        books: newChar.books,
        stat: 0,
        houseId: houseId
      }
    }).then(function(response) {
      controller.getCurrentUser();
    });
  }

  //=================================
  // Delete Character
  //=================================
  this.deleteCharacter = function(charId) {
    $http({ // Makes HTTP request to server
      method: 'POST',
      url: '/characters/' + charId
    }).then(function(response) {
      controller.getCurrentUser();
    });
  }

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

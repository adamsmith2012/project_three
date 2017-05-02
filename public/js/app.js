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

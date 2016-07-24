angular.module('travs.controllers', ['chart.js', 'ngCordova'])

.controller("notifCtrl", function($scope, $ionicModal, $cordovaLocalNotification){

  $scope.int = [
    {minutes: 1, selected: false},
    {minutes: 20, selected: false},
    {minutes: 30, selected: false},
    {minutes: 60, selected: false},
    {minutes: 120, selected: false}
  ];
  $ionicModal.fromTemplateUrl('/templates/notif.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.showNotif = function(){
    $scope.modal.show();
  };

  $scope.closeNotif = function(){
    $scope.modal.hide();
  };

  $scope.notify = function(){

      $scope.submitAnswer = function(int){
        console.log(int.time);
      
      var alarmTime = new Date();
      alarmTime.setHours(7);
      if(int.time<60){
        alarmTime.setMinutes(60-int.time);
      }
      alert(alarmTime);
      $cordovaLocalNotification.add({
        date: alarmTime,
        message: $scope.data +" minutes before peak hour",
        title: "Travs",
        autoCancel: true,
        sound: null
      }).then(function(){
          $ionicPopup.alert({
            title: 'Alert',
            template: 'asdf'
          });
      });
    }
    };
})

.controller("routeListCtrl", function($scope, $http, $ionicModal) {

    $http.get('getroute.php').success(function(response) {
        $scope.routes = response.records;
    });


    //$scope.orderProp = 'name';
})

.controller("peakCtrl", ['$scope', function ($scope) {
    $scope.labels = ["5am", "6am", "7am", "8am", "9am", "10am", "11am","12nn"];
    //$scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [10, 60, 80, 85, 56, 55, 40,60],
      //[28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
}])

.controller('routeCtrl', function ($scope) {
function initMap() {
  var pointA = new google.maps.LatLng(51.7519, -1.2578),
    pointB = new google.maps.LatLng(50.8429, -0.1313),
    myOptions = {
      zoom: 7,
      center: pointA
    },
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });

  // get route from A to B
  calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}



function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

initMap();
})


.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  function initialize() {

    var myLatlng = new google.maps.LatLng(0,0);

    navigator.geolocation.getCurrentPosition(function(pos) {
        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(pos.coords.latitude);
        
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
    mapOptions);
        
    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
    $scope.map = map;


        
      }, function(error) {
        //alert('Unable to get location: ' + error.message);
        console.log("asdf");
      });

  }
    google.maps.event.addDomListener(window, 'load', initialize);
      
      
});
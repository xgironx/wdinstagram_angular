
                  // ######################################
                  // 201703081444L  EL MIERCOLES   JAY -->
                  // FROM MTG W Beauregard
                  // 201703081943L  EL MIERCOLES   JAY -->
                  // https://github.com/ga-wdi-exercises/grumblr_angular/blob/wdi14-solution/js/app.js

"use strict";


let instaData = [
  {
    author: "Beauregard",
    body: "Street without joy",
    photo_url: "https://s3-us-west-2.amazonaws.com/tabs.web.media/b/q/bqs8/bqs8-square-1536.jpg"
  },
  {
    author: "Beauregard",
    body: "Daniel, really, exupery, jpmmuseo",
    photo_url: "https://www.instagram.com/p/nUD8DyNnwf/?taken-by=xgironx&hl=en"
  },
  {
    author: "JimJam",
    body: "x",
    photo_url: "http://images.motorcycle-usa.com/articleimages/001-20150320_RGS_5071.jpg"
  },
  {
    author: "PBandJ",
    body: "zoomzooom",
    photo_url: "http://www.genuinescooters.com/images/scooter_pics/buddy50_turquoise.jpg"
  },
]


angular
  .module("gram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("gramFactory", [
    "$resource",
    gramFactoryFunction
  ])
  .controller("gramIndexController", [
    "gramFactory",
    gramIndexControllerFunction
  ])
  .controller("gramNewController", [
    "gramFactory",
    "$state",
    gramNewControllerFunction
  ])
  .controller("gramShowController", [
    "gramFactory",
    "$stateParams",
    gramShowControllerFunction
  ])
  .controller("gramEditController", [
    "gramFactory",
    "$stateParams",
    "$state",
    gramEditControllerFunction
  ])

function RouterFunction($stateProvider){
  $stateProvider
  .state("gramIndex", {
    url: "/grams",
    templateUrl: "js/ng-views/index.html",
    controller: "gramIndexController",
    controllerAs: "vm"
  })
  .state("gramNew", {
    url: "/grams/new",
    templateUrl: "js/ng-views/new.html",
    controller: "gramNewController",
    controllerAs: "vm"
  })
  .state("gramShow", {
    url: "/grams/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "gramShowController",
    controllerAs: "vm"
  })
  .state("gramEdit", {
    url: "/grams/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "gramEditController",
    controllerAs: "vm"
  })
}

function gramFactoryFunction( $resource ) {
  return $resource("http://localhost:3000/entries/:id", {}, {
    // return $resource("http://localhost:3000/grams/:id", {}, {
    update: { method: "PUT" }
  })
}

function gramIndexControllerFunction( gramFactory ) {
  this.grams = gramFactory.query()
}

function gramNewControllerFunction( gramFactory, $state ) {
  this.gram = new gramFactory()
  this.create = function() {
    this.gram.$save(function(gram) {
      $state.go("gramShow", {id: gram.id})
    })
  }
}

function gramShowControllerFunction( gramFactory, $stateParams ) {
  this.gram = gramFactory.get({id: $stateParams.id})
  console.log(this.gram)
}

function gramEditControllerFunction( gramFactory, $stateParams, $state ) {
  this.gram = gramFactory.get({id: $stateParams.id})
  this.update = function() {
    this.gram.$update({id: $stateParams.id}, function(gram) {
      $state.go("gramShow", {id: gram.id})
    })
  }
  this.destroy = function(){
    this.gram.$delete({id: $stateParams.id}, function() {
      $state.go("gramIndex")
    })
  }
}

// Ionic myApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'myApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'myApp.services' is found in services.js
// 'myApp.controllers' is found in controllers.js
angular.module('myApp', ['ionic', 'myApp.controllers', 'myApp.services', 'ionic.service.core'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

// Identify App
.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID for the server
    app_id: 'e706c150',
    // The API key all services will use for this app
    api_key: 'bbd426427fbbc234e0e1e7e6867c9b7e95d9cb948d4f523b'
  });
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.merchants', {
      url: '/merchants',
      views: {
        'tab-merchants': {
          templateUrl: 'templates/tab-merchants.html',
          controller: 'MerchantsCtrl'
        }
      }
    })
    .state('tab.new-merchant', {
      url: '/merchants/new-merchant',
      views: {
        'tab-merchants': {
          templateUrl: 'templates/new-merchant.html',
          controller: 'NewMerchantCtrl'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/merchants');

});

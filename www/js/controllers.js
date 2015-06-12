angular.module('myApp.controllers', [])

.controller('DashCtrl', function($rootScope, $scope, $ionicPlatform ,MerchantService) {
  $ionicPlatform.ready(function() {
      MerchantService.initDB();

      // Get all merchant records from the database.
      MerchantService.getAllMerchants().then(function(merchants) {

        $rootScope.merchants = merchants;
          console.log(merchants);
      });
  });

})

.controller('MerchantDetailsCtrl', function($scope ,MerchantService) {
  $scope.merchant;
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MerchantsCtrl', function($rootScope, $scope, MerchantService) {

  $scope.remove = function(merchant) {
    MerchantService.deleteMerchant(merchant);
    $rootScope.merchants.splice(merchant);
  };

  $scope.deleteDB = function() {
    MerchantService.removeDB();
    MerchantService.getAllMerchants().then(function(merchants) {
      $rootScope.merchants = merchants;
    });
  };
})

.controller('NewMerchantCtrl', function($scope, $window, MerchantService) {
  $scope.merchant = {}
  var originalMerchant = angular.copy($scope.merchant);

  $scope.addMerchant = function() {
    $scope.merchant._id = $scope.merchant.name;

    MerchantService.addMerchant($scope.merchant).then(function(response) {
      console.log("Attempted to add......."+"\n"+"Response: " + response);
      $window.location.href = '#/tab/merchants'
    }).catch(function (err) {
      console.log("Error: " + err);
      });
  };

  $scope.reset = function() {
    $scope.merchant = angular.copy(originalMerchant);
  };

  $scope.merchantChanged = function() {
    return !angular.equals($scope.merchant, originalMerchant)
  };

  $scope.reset();
});

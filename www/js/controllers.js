angular.module('myApp.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MerchantsCtrl', function($scope, $ionicPlatform, MerchantService) {

  // Initialize the database.
  $ionicPlatform.ready(function() {
      MerchantService.initDB();

      // Get all merchant records from the database.
      MerchantService.getAllMerchants().then(function(merchants) {
        $scope.merchants = merchants;
          console.log(merchants);
      });
  });

    $scope.remove = function(merchant) {
      MerchantService.deleteMerchant(merchant);
    };

    $scope.deleteDB = function() {
      MerchantService.removeDB();
    };
})

.controller('NewMerchantCtrl', function($scope, MerchantService) {
  $scope.merchant = {};
  $scope.addMerchant = function() {
    var merchant = $scope.merchant;
    merchant._id = merchant.name;

    MerchantService.addMerchant($scope.merchant).then(function(response) {
      console.log("Attempted to add......."+"\n"+"Response: " + response)
    }).catch(function (err) {
      console.log("Error: " + err);
      });
  }
});

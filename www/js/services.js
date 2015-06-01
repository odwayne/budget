angular.module('myApp.services', [])

  // Some fake testing data
.factory('Merchants', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var merchants = [{
    id: 0,
    name: 'Wells Fargo Bank',
    totalOwe: 15000.00,
    minPayment: 100,
    dueDay: 15
  }, {
    id: 1,
    name: 'Chase Bank',
    totalOwe: 9888.96,
    minPayment: 256.32,
    dueDay: 22
  }];

  return {
    all: function() {
      return merchants;
    },
    remove: function(merchant) {
      merchants.splice(merchant.indexOf(chat), 1);
    },
    get: function(merchantId) {
      for (var i = 0; i < merchants.length; i++) {
        if (merchants[i].id === parseInt(merchantId)) {
          return merchants[i];
        }
      }
      return null;
    },
    add: function(merchant) {
      merchant.id = merchants.length + 1;
      return merchants.push(merchant);

    }
  };
})

.factory('MerchantService', ['$q',function($q) {

  var _db;

  var _merchants;

  return {
    initDB: initDB,
    getAllMerchants: getAllMerchants,
    addMerchant: addMerchant,
    updateMerchant: updateMerchant,
    deleteMerchant: deleteMerchant,
    removeDB: removeDB
  };

  function initDB() {
    _db = new PouchDB('merchants', {location : 1});
    console.log("db: " + _db)
  };

  function removeDB() {
    _db.destroy().then(function () {
      console.log("Success")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function addMerchant(merchant) {
    var deferred = $q.defer();
    deferred.resolve(_db.put(merchant));
    return deferred.promise;
  };

  function getAllMerchants() {
    var deferred = $q.defer();

    if (!_merchants) {
        deferred.resolve(_db.allDocs({ include_docs: true})
            .then(function(docs) {

                // Each row has a .doc object and we just want to send an
                // array of merchants objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.
                _merchants = docs.rows.map(function(row) {
                    // Dates are not automatically converted from a string.
                    row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });

                // Listen for changes on the database.
                _db.changes({ live: true, since: 'now', include_docs: true})
                   .on('change', onDatabaseChange);

                return _merchants;
            }));
    } else {
        // Return cached data as a promise
        deferred.resolve(_merchants);
    }

   return deferred.promise;
  };

  function updateMerchant() {
    var deferred = $q.defer();
    deferred.resolve(_db.put(merchant));
    return deferred.promise;
  };

  function deleteMerchant(merchant) {
    var deferred = $q.defer();
    deferred.resolve(_db.remove(merchant));
    return deferred.promise;
  };

  function onDatabaseChange(change) {
    var index = findIndex(_merchants, change.id);
    var merchant = _merchants[index];

    if (change.deleted) {
        if (merchant) {
            _merchants.splice(index, 1); // delete
        }
    } else {
        if (merchant && merchant._id === change.id) {
            _merchants[index] = change.doc; // update
        } else {
            _merchants.splice(index, 0, change.doc) // insert
        }
    }
  };
  // Binary search, the array is by default sorted by _id.
  function findIndex(array, id) {
      var low = 0, high = array.length, mid;
      while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
      }
      return low;
  };
}]);

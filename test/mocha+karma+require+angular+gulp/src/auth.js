angular.module('services')
  .factory('Auth', function Auth($http, $q) {
      var user = null;

      var readStoredUser = function readStoredUser() {
          //Try to read in from localStorage if one exists
          var storedUser = window.localStorage.getItem('user');
          try {
              if(storedUser) {
                  // Note: Using a simple user model here
                  user = new User(JSON.parse(storedUser));
              }
          } catch (ex) { /* Silently fail..*/ }
      }

      readStoredUser();

      var currentUser = function currentUser() {
          if(!user) {
              readStoredUser();
          }
          return user;
      }

      var saveUser = function saveUser(userToSave) {
          window.localStorage.setItem('user', JSON.stringify(userToSave));
          user = userToSave;
      }

      var loginWithEmail = function loginWithEmail(name, email) {
          var deferred = $q.defer();

          var postPath = 'http://someurl.dev/api/v1/login';
          var postData = { name: name, email: email };

          $http.post(postPath, postData).success(function(data) {
              if(data.success) {
                  deferred.resolve(data);
              } else {
                  deferred.reject(data);
              }
          }).error(function(error) {
              deferred.reject(error);
          });

          return deferred.promise;
      }

      return {
          currentUser: currentUser,
          loginWithEmail: loginWithEmail,
          saveUser: saveUser
      };
  })
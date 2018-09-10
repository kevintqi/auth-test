/*
 Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
angular.module('cognitoBlog.loggedIn', ['cognitoBlog.authService'])
    .controller('loggedInController', function ($scope, $location, authService, $http) {

        authService.isAuthenticated().then(function (result) {
            console.log(result);
        }, function (msg) {
            console.log(msg);
            $scope.errormessage = "Not authenticated";
            if ($scope.$$phase != '$digest') {
                $scope.$apply();
            }
            return;
        });

        $scope.input = "";
        $scope.actAsManager = function (input) {
            authService.getUserAccessToken().then(function(userIdToken) {
                $http({
                    method: 'POST',
                    url: YOUR_API_URL,
                    headers: {
                        authorization: 'Bearer ' + userIdToken.getJwtToken(),
                        'user-pool-id': YOUR_USER_POOL_ID
                    },
                    data: { test: input }
                })
                .then(function successCallback(response) {
                        console.log(response);
                    }, function errorCallback(err) {
                        console.log(err);
                        $scope.errormessage = "Some error happened";
                });
            }).catch(function(err){
                console.log(err);
            });
        };

        $scope.actAsEmployee = function () {
            authService.getUserAccessToken().then(function (userIdToken) {
                $http({
                    method: 'GET',
                    url: YOUR_API_URL,
                    headers: {
                        authorization: 'Bearer ' + userIdToken.getJwtToken(),
                        'user-pool-id': YOUR_USER_POOL_ID
                    }
                })
                .then(function successCallback(response) {
                        console.log(response);
                    }, function errorCallback(err) {
                        console.log(err);
                        $scope.errormessage = "Some error happened";
                });
            }).catch(function(err){
                console.log(err);
            });
        };

        $scope.logout = function () {
            authService.logOut();
            $location.path('/');
        }
    });



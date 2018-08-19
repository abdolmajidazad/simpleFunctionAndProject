'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .service('interpolateService', ['$http', '$q', function ($http, $q) {
        const getData = {
            country: function (option) {
                return new Promise((resolve, reject) => {
                    $http(option).then(function (response) {
                        resolve(response)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            },
            country2: function (option) {

                let defer = $q.defer();
                $http(option).then((response) => {
                    defer.resolve(response)
                }).catch((error) => {
                    defer.reject(error)
                });
                return defer.promise
            },

            country3: function (option) {
                return new Promise(function (resolve, reject) {
                    fetch(option['url'], {
                        method: "GET",
                    })
                        .then(response => response.json())
                        .then((response) => {
                            resolve(response);
                        }).catch((error) => {
                        console.log("error", error)
                    })
                })
                // return new Promise(function (resolve, reject) {
                //     fetch(option['url'],{
                //         method: "GET", // *GET, POST, PUT, DELETE, etc.
                //         mode: "cors", // no-cors, cors, *same-origin
                //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                //         credentials: "same-origin", // include, same-origin, *omit
                //         headers: {
                //             "Content-Type": "application/json; charset=utf-8",
                //             // "Content-Type": "application/x-www-form-urlencoded",
                //         },
                //         redirect: "follow", // manual, *follow, error
                //         referrer: "no-referrer", // no-referrer, *client
                //         body: JSON.stringify({}), // body data type must match "Content-Type" header
                //     }).then(function (response) {
                //         console.log("response", response)
                //     }).catch(function (error) {
                //         console.log("error", error)
                //     })
                // })
            },
        };
        return getData
    }])

    .controller('View2Ctrl', ['$scope', 'interpolateService', function ($scope, interpolateService) {
        const option = {
            method: "GET",
            url: "https://restcountries.eu/rest/v2/all",
            data: {},
            headers: {}
        };

        $scope.list = [];
        interpolateService.country(option).then(function (response) {
            console.log(response)
            if (response.status === 200) {
                $scope.list = response.data;
            }
        }).catch(function (error) {
            console.log(error)
        });


        interpolateService.country2(option).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        });


        interpolateService.country3(option).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        });


    }]);
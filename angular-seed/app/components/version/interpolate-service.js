'use strict';

angular.module('myApp.version.interpolate-filter', [])

    .service('getData', ['$http', function ($http) {
        const getData = {
            country: function (option) {
                return new Promise(function (resolve, reject) {
                    $http(option).then(function (response) {
                        resolve(response)
                    }).catch(function (error) {
                        reject(error)
                    })
                })
            }
        };

        return getData
    }]);

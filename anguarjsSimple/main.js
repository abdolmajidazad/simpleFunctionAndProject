var app = angular.module('pageLoadApp', ['ui.router', 'pascalprecht.translate'])
    .config(function ($stateProvider) {


        var signinState = {
            name: 'signin',
            url: '/signin',
            templateUrl: './pages/signin/signin.html',
            controller: "signinCtrl",
        };

        var signupState = {
            name: 'signup',
            url: '/signup',
            templateUrl: './pages/signup/signup.html',
            controller: "signupCtrl",
        };

        $stateProvider.state(signinState);
        $stateProvider.state(signupState);
    })
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true
        }).hashPrefix('');
    }])


    /**
     * change site language
     */
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('fa');
        $translateProvider.useLoader('languageLoader');
    }])

    /**
     * load json file content translate word
     * for get fa | en language json file
     */
    .factory('languageLoader', ["$q", "$timeout", "$http", function ($q, $timeout, $http) {
        return function (options) {
            let deferred = $q.defer();
            let theOption = {
                method: 'GET',
                url: './i18n/' + options.key + '.json'
            };
            $http(theOption).then(response => {
                deferred.resolve(response['data']);
            }, err => {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }]);

app.controller('pageLoadAppCtrl', ['$scope', 'notify', function ($scope, notify) {

}]);
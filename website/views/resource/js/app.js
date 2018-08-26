/**
 * create angular module and call  dependency module
 * @type {angular.Module}
 */
let myApp = angular.module('myApp',
    [
        'ui.router',
        'pascalprecht.translate',
        'ngSanitize',
        'ui.bootstrap.contextMenu',
        'angular-progress-arc',
        'updateMeta',
        'colorpicker',
        'ngMask',
        'ui.sortable',
        "relativeDate",
        "ngRateIt",
        'vcRecaptcha',


    ]);
// 'angularSails.io'

window.errorAu = 1;
myApp.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://docs.google.com/**'
    ]);

    // // The blacklist overrides the whitelist so the open redirect here is blocked.
    // $sceDelegateProvider.resourceUrlBlacklist([
    //     'http://myapp.example.com/clickThru**'
    // ]);
});
/**
 * root controller
 * this controller load in first call project
 */
myApp.controller("rootCtrl", ['$scope', '$rootScope', 'generalData', function ($scope, $rootScope, generalData) {
    $rootScope.startDate = new Date();
}]);


/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs an AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */
myApp.filter('propsFilter', function () {
    return function (items, props) {
        let out = [];

        if (angular.isArray(items)) {
            let keys = Object.keys(props);

            items.forEach(function (item) {
                let itemMatches = false;

                for (let i = 0; i < keys.length; i++) {
                    let prop = keys[i];
                    let text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});


/**
 * this directive call when page load
 * remove splash project loading
 */
myApp.directive(
    "applicationLoading", ["$animate", function ($animate) {
        return ({link: link, restrict: "C"});

        function link(scope, element, attr) {

            $(".main-content-body").fadeOut(0);
            window.scrollTo(0, 0);
            $(".main-content-body-helper").slideDown(0);
            $animate.leave(element.children().eq(1)).then(function cleanupAfterAnimation() {
                /**
                 * check support Promise or not
                 * when Not support promise , background color is #FFFBDD in ?force url
                 */


                if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                    document.getElementsByTagName('body')[0].style.overflow = '';
                    $('.application-start').remove();
                    console.log("applicationLoading::", scope, element)

                    $(".main-content-body").fadeIn(700);
                    $(".main-content-body-helper").slideUp(700);

                }
            });
        }
    }]
);



/**
 * for resolve AngularJs Ui-routing transition superseded
 */
myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

/**
 * change site language
 */
myApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('fa');
    $translateProvider.useLoader('languageLoader');
}]);

/**
 * load json file content translate word
 * for get fa | en language json file
 */
myApp.factory('languageLoader', ["$q", "$timeout", "$http", function ($q, $timeout, $http) {
    return function (options) {
        let deferred = $q.defer();
        let theOption = {
            method: 'GET',
            url: '../library/i18n/' + options.key + '.json'
        };
        $http(theOption).then(response => {
            deferred.resolve(response['data']);
        }, err => {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);

/**
 * for remove #! from url of angular routing
 */
myApp.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true
    }).hashPrefix('');
}]);


/**
 * create state name for create new page and url
 */




myApp.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide"
    , function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
        myApp.controllerProvider = $controllerProvider;
        myApp.compileProvider = $compileProvider;
        myApp.stateProvider = $stateProvider;
        myApp.filterProvider = $filterProvider;
        myApp.provide = $provide;

        let environment = window.enviroment;

        console.log("environment:", environment)

        /**
         * when page not exist in $stateProvider state , redirect page to 404
         */
        $urlRouterProvider.otherwise("/404");
        $stateProvider
            .state('root', {
                url: "",
                css: appIncludeFilesJson[appEnvironment].pages.root.css,

                abstract: true,
                views: {
                    "main@": {
                        template: '<div  ng-include="getTemplateUrl()"></div>',
                        controller: 'rootController',
                    },
                    // "body@" : {},
                    "header@root": {
                        templateUrl: `${environment==='development' ? 'views/tpl/header/header.html?@@timeStampVersion' : 'library/pageBundle/html/header.min.html?@@timeStampVersion'}`,
                        controller: 'headerController'
                    },
                    "footer@root": {
                        templateUrl: `${environment==='development' ? 'views/tpl/footer/footer.html?@@timeStampVersion': 'library/pageBundle/html/footer.min.html?@@timeStampVersion'}`,
                        controller: 'footerController'
                    },
                    "rightSidebar@root": {
                        templateUrl: `${environment==='development' ? 'views/tpl/sidebar/right/rightSidebar.html?@@timeStampVersion': 'library/pageBundle/html/rightSidebar.min.html?@@timeStampVersion'}`,
                        controller: 'rightSidebarController'
                    },
                    "leftSidebar@root": {
                        templateUrl: `${environment==='development' ? 'views/tpl/sidebar/left/leftSidebar.html?@@timeStampVersion': 'library/pageBundle/html/leftSidebar.min.html?@@timeStampVersion'}`,
                        controller: 'leftSidebarController'
                    },
                    "menubar@root": {
                        templateUrl: `${environment==='development' ? 'views/tpl/menubar/menubar.html?@@timeStampVersion': 'library/pageBundle/html/menubar.min.html?@@timeStampVersion'}`,
                        controller: 'leftSidebarController'
                    }
                },
                resolve:

                    {
                        deps: function ($q, $rootScope) {
                            //console.log('layout');
                            let deferred = $q.defer();
                            let dependencies = appIncludeFilesJson[appEnvironment].pages.root.js;
                            $script(dependencies, function () {
                                $rootScope.$apply(function () {
                                    deferred.resolve();
                                });
                            });
                            return deferred.promise;
                        }
                    }
            })
            .state('root.home', {
                url: "/",
                views: {
                    "afterLogin": {
                        templateUrl: `${environment==='development' ? "views/pages/home/home.html?@@timeStampVersion" : 'library/pageBundle/html/home.min.html?@@timeStampVersion'}`,
                        controller: "HomeCtrl",
                    }
                },
                css: appIncludeFilesJson[appEnvironment].pages.home.css,
                resolve:
                    {
                        deps: function ($q, $rootScope) {
                            let deferred = $q.defer();
                            let dependencies = appIncludeFilesJson[appEnvironment].pages.home.js;

                            $script(dependencies, function () {
                                $rootScope.$apply(function () {
                                    deferred.resolve();
                                });
                            });
                            return deferred.promise;
                        }
                    }
            })
            .state('root.aboutUs', {
                url: "/about-us",
                views: {
                    "afterLogin": {
                        templateUrl: `${environment==='development' ? "views/pages/aboutUs/aboutUs.html?@@timeStampVersion" : 'library/pageBundle/html/aboutUs.min.html?@@timeStampVersion'}`,
                        controller: "AboutUsCtrl",
                    }
                },
                css: appIncludeFilesJson[appEnvironment].pages.aboutUs.css,
                resolve:
                    {
                        deps: function ($q, $rootScope) {
                            let deferred = $q.defer();
                            let dependencies = appIncludeFilesJson[appEnvironment].pages.aboutUs.js;

                            $script(dependencies, function () {
                                $rootScope.$apply(function () {
                                    deferred.resolve();
                                });
                            });
                            return deferred.promise;
                        }
                    }
            })
            .state('root.notFound', {
                url: "/404",
                views: {
                    "beforeLogin": {
                        templateUrl: `${environment==='development' ? "views/pages/404/404.html?@@timeStampVersion" : 'library/pageBundle/html/404.min.html?@@timeStampVersion'}`,
                        controller: "NotFoundCtrl",
                    }
                },
                css: appIncludeFilesJson[appEnvironment].pages.notFound.css,
                resolve:
                    {
                        deps: function ($q, $rootScope) {
                            let deferred = $q.defer();
                            let dependencies = appIncludeFilesJson[appEnvironment].pages.notFound.js;

                            $script(dependencies, function () {
                                $rootScope.$apply(function () {
                                    deferred.resolve();
                                });
                            });
                            return deferred.promise;
                        }
                    }
            });

        $urlRouterProvider.deferIntercept();
    }]);

myApp.controller("rootController", ['$scope', function ($scope) {
    $scope.$on('rootControllerEmitter', function () {
        $scope.$broadcast(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7])
    });
    let environment = window.enviroment;
    $scope.getTemplateUrl = function () {
            return `${environment==='development' ?  'views/tpl/main/after-login.html?@@timeStampVersion' : 'library/pageBundle/html/after-login.min.html?@@timeStampVersion'}`;
        }

}]);


myApp.run(["$urlRouter", function ($urlRouter) {
    $urlRouter.listen();
}]);











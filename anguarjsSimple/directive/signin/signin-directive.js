app.directive('signinDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'directive/signin/view/signin-template.html',
        controller: 'signInDirectiveController'
    };
}).controller("signInDirectiveController", ['$scope', 'notify', function ($scope, notify) {

    console.log("signInDirectiveController");
}]);

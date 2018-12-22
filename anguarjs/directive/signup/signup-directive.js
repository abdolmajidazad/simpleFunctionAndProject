app.directive('signupDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'directive/signup/view/signup-template.html',
        controller: 'signUpDirectiveController'
    };
}).controller("signUpDirectiveController", ['$scope', 'notify', function ($scope, notify) {

    console.log("signUpDirectiveController");
}]);

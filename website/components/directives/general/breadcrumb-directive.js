myApp.directive('breadcrumbDirective', function () {
    return {
        restrict: 'E',
        scope: {
            breadcrumb: "=?",
            otherPage : "@",
            otherPageReload:"=?"
        },
        templateUrl: 'library/bundle/html/breadcrumb-template.html?@@timeStampVersion',
        controller: 'breadcrumbController'
    };
});
myApp.controller("breadcrumbController", ['$scope', function ($scope) {
    $scope.close = ()=>{
        $scope.$emit('rootControllerEmitter','pageDirective', 'close', $scope.otherPageReload)
    };

}]);

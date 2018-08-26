myApp.directive('colorPickerDirective', function () {
    return {
        restrict: 'E',
        scope: {
            colorPickerConfig: "=?"
        },
        templateUrl: 'library/bundle/html/color-picker-template.html?@@timeStampVersion',
        controller: 'colorPickerController'
    };
});
myApp.controller("colorPickerController", ['$scope', function ($scope) {
    $scope.colorPickerConfig['showInput'] = $scope.colorPickerConfig['showInput'] !== undefined ? $scope.colorPickerConfig['showInput'] : true
    $scope.var = $scope.colorPickerConfig['color'] || "#ffffff";
    $scope.style={background:$scope.var,...$scope.colorPickerConfig['style']};
    $scope.$watch('var', (n,o)=>{
        $scope.$emit('rootControllerEmitter','colorPickerDirective', $scope.colorPickerConfig['id'], n)
    })

}]);

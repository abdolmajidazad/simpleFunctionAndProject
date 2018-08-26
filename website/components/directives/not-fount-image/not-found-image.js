myApp.directive('errSrc', function () {
    return {
        restrict: 'A', link: function (scope, element, attrs) {
            element.bind('error', function () {
                console.log("%%%%%%%%%%%%%%%%::", attrs.errSrc)
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                    scope.$emit("notFoundImg");
                }
            });
        }
    };
});

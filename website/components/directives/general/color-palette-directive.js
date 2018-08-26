myApp.directive('colorPaletteDirective', function () {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: 'library/bundle/html/color-palette-template.html?@@timeStampVersion',
        controller: 'colorPaletteController'
    };
});
myApp.controller("colorPaletteController", ['$scope', function ($scope) {
    const colorPickerConfig = {
        "model":"var",
        "showValue":true,// false
        "outputFormat":'hex',//'rgba', 'hsla',
        "position":'right',// left, top, bottom
        "fixedPosition": true,// true
        "showInputSpinner":false,
        "spinnerRgbaSteps":'1;1;1;1',//1;1;1;0.1
        "spinnerHslaSteps":'1;1;1;1',//1;1;1;0.1
        "showCancelButton":true ,//false
        "cancelButtonClass":'seller-btn',
        "showInput" : false,
        "style" : {
            left: '0px',
            top: '-5px',
        }
    };

    $scope.show=false;
    const defaultParameter = ()=>{
        $scope.color1 = {...colorPickerConfig, title:"main_color" ,id:'--main-color', color : '#AD1457'};
        $scope.color2 = {...colorPickerConfig, title:"main_error_color" ,id:'--main-error-color',color : '#FF0000'};
        $scope.color3 = {...colorPickerConfig, title:"main_border_color" ,id:'--main-border-color',color : '#818181'};
        $scope.color4 = {...colorPickerConfig, title:"main_icon_color" ,id:'--main-icon-color',color : '#000'};
        $scope.color5 = {...colorPickerConfig, title:"main_icon_other_color" ,id:'--main-icon-other-color',color : '#fff'};
        $scope.color6 = {...colorPickerConfig, title:"main_body_color" ,id:'--main-body-color',color : '#f5f5f5'};
        $scope.color7 = {...colorPickerConfig, title:"main_body_other_section_color" ,id:'--main-body-other-section-color',color : '#f8f9fa'};
        $scope.color8 = {...colorPickerConfig, title:"main_body_font_color" ,id:'--main-body-font-color',color : '#000000'};
        $scope.color9 = {...colorPickerConfig, title:"main_body_font_link_color" ,id:'--main-body-font-link-color',color : '#2427ff'};
        $scope.color10 = {...colorPickerConfig, title:"main_content_color" ,id:'--main-content-color',color : '#fff'};
        setTimeout(()=>{
           $scope.$apply();
        },10);
        $scope.show=true;
    };
    defaultParameter();


    $scope.reset = ()=>{
        $scope.show=false;
        setTimeout(()=>{
            defaultParameter()
        },10);
    };


    $scope.$on("colorPickerDirective",(e, id, color)=>{
        document.documentElement.style.setProperty(id, color);
    })
}]);

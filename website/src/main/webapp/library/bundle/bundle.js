var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/***
 GLobal Directives
 ***/
//Route State Load Spinner(used on page or content load)
myApp.directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
    return {
        link: function link(scope, element, attrs) {
            // by defult hide the spinner bar
            element.addClass('hide'); // hide spinner bar by default

            // display the spinner bar whenever the route changes(the content part started loading)
            $rootScope.$on('$stateChangeStart', function () {
                element.removeClass('hide'); // show spinner bar
            });

            // hide the spinner bar on rounte change success(after the content loaded)
            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('hide'); // hide spinner bar
                $('body').removeClass('page-on-load'); // remove page loading indicator
                Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                // auto scorll to page top
                setTimeout(function () {
                    App.scrollTop(); // scroll to the top on content load
                }, $rootScope.settings.layout.pageAutoScrollOnLoad);
            });

            // handle errors
            $rootScope.$on('$stateNotFound', function () {
                element.addClass('hide'); // hide spinner bar
            });

            // handle errors
            $rootScope.$on('$stateChangeError', function () {
                element.addClass('hide'); // hide spinner bar
            });
        }
    };
}]);

// Handle global LINK click
myApp.directive('a', function () {
    return {
        restrict: 'E', link: function link(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
myApp.directive('dropdownMenuHover', function () {
    return {
        link: function link(scope, elem) {
            elem.dropdownHover();
        }
    };
});
myApp.directive('fileReader', ['$parse', function ($parse) {
    return {
        scope: {
            fileReader: "="
        },
        link: function link(scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    // scope.fileread = changeEvent.target.files[0];
                    // or all selected prodfiles:
                    scope.fileread = changeEvent.target.files;
                });
            });
        }
    };
}]);
myApp.directive('breadcrumbDirective', function () {
    return {
        restrict: 'E',
        scope: {
            breadcrumb: "=?",
            otherPage: "@",
            otherPageReload: "=?"
        },
        templateUrl: 'library/bundle/html/breadcrumb-template.html?1535267630534',
        controller: 'breadcrumbController'
    };
});
myApp.controller("breadcrumbController", ['$scope', function ($scope) {
    $scope.close = function () {
        $scope.$emit('rootControllerEmitter', 'pageDirective', 'close', $scope.otherPageReload);
    };
}]);

myApp.directive('colorPaletteDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'library/bundle/html/color-palette-template.html?1535267630534',
        controller: 'colorPaletteController'
    };
});
myApp.controller("colorPaletteController", ['$scope', function ($scope) {
    var colorPickerConfig = {
        "model": "var",
        "showValue": true, // false
        "outputFormat": 'hex', //'rgba', 'hsla',
        "position": 'right', // left, top, bottom
        "fixedPosition": true, // true
        "showInputSpinner": false,
        "spinnerRgbaSteps": '1;1;1;1', //1;1;1;0.1
        "spinnerHslaSteps": '1;1;1;1', //1;1;1;0.1
        "showCancelButton": true, //false
        "cancelButtonClass": 'seller-btn',
        "showInput": false,
        "style": {
            left: '0px',
            top: '-5px'
        }
    };

    $scope.show = false;
    var defaultParameter = function defaultParameter() {
        $scope.color1 = _extends({}, colorPickerConfig, { title: "main_color", id: '--main-color', color: '#AD1457' });
        $scope.color2 = _extends({}, colorPickerConfig, { title: "main_error_color", id: '--main-error-color', color: '#FF0000' });
        $scope.color3 = _extends({}, colorPickerConfig, { title: "main_border_color", id: '--main-border-color', color: '#818181' });
        $scope.color4 = _extends({}, colorPickerConfig, { title: "main_icon_color", id: '--main-icon-color', color: '#000' });
        $scope.color5 = _extends({}, colorPickerConfig, { title: "main_icon_other_color", id: '--main-icon-other-color', color: '#fff' });
        $scope.color6 = _extends({}, colorPickerConfig, { title: "main_body_color", id: '--main-body-color', color: '#f5f5f5' });
        $scope.color7 = _extends({}, colorPickerConfig, { title: "main_body_other_section_color", id: '--main-body-other-section-color', color: '#f8f9fa' });
        $scope.color8 = _extends({}, colorPickerConfig, { title: "main_body_font_color", id: '--main-body-font-color', color: '#000000' });
        $scope.color9 = _extends({}, colorPickerConfig, { title: "main_body_font_link_color", id: '--main-body-font-link-color', color: '#2427ff' });
        $scope.color10 = _extends({}, colorPickerConfig, { title: "main_content_color", id: '--main-content-color', color: '#fff' });
        setTimeout(function () {
            $scope.$apply();
        }, 10);
        $scope.show = true;
    };
    defaultParameter();

    $scope.reset = function () {
        $scope.show = false;
        setTimeout(function () {
            defaultParameter();
        }, 10);
    };

    $scope.$on("colorPickerDirective", function (e, id, color) {
        document.documentElement.style.setProperty(id, color);
    });
}]);

myApp.directive('colorPickerDirective', function () {
    return {
        restrict: 'E',
        scope: {
            colorPickerConfig: "=?"
        },
        templateUrl: 'library/bundle/html/color-picker-template.html?1535267630534',
        controller: 'colorPickerController'
    };
});
myApp.controller("colorPickerController", ['$scope', function ($scope) {
    $scope.colorPickerConfig['showInput'] = $scope.colorPickerConfig['showInput'] !== undefined ? $scope.colorPickerConfig['showInput'] : true;
    $scope.var = $scope.colorPickerConfig['color'] || "#ffffff";
    $scope.style = _extends({ background: $scope.var }, $scope.colorPickerConfig['style']);
    $scope.$watch('var', function (n, o) {
        $scope.$emit('rootControllerEmitter', 'colorPickerDirective', $scope.colorPickerConfig['id'], n);
    });
}]);

myApp.directive('ngRightClick', ['$parse', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
}]);
myApp.directive('errSrc', function () {
    return {
        restrict: 'A', link: function link(scope, element, attrs) {
            element.bind('error', function () {
                console.log("%%%%%%%%%%%%%%%%::", attrs.errSrc);
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                    scope.$emit("notFoundImg");
                }
            });
        }
    };
});

myApp.directive("translatorDirective", function () {
    return {
        restrict: "E",
        scope: {},
        templateUrl: 'library/bundle/html/translator-template.html',
        controller: 'translatorDirectiveController'
    };
});
myApp.controller("translatorDirectiveController", ['$scope', '$translate', 'settings', 'logger', function ($scope, $translate, settings, logger) {

    /**
     * change language of project with translator
     * @param langKey
     */
    $scope.changeLanguage = function (langKey) {
        setLanguage(langKey);

        /**
         * translate event for change language
         */
        $translate.use(langKey);
    };

    /**
     * set button value for change language
     * @param langKey
     */
    function setLanguage(langKey) {
        $scope.lan = langKey === 'fa' ? 'en' : 'fa';
        $scope.lanDetail = langKey === 'fa' ? 'BUTTON_LANG_EN' : 'BUTTON_LANG_FA';
    }
    setLanguage(settings['defaultLanguage']);
}]);
//https://github.com/rstacruz/nprogress
myApp.factory('ChartService', ['settings', function (settings) {
    return {

        /**
         * Loads the visualization module from the Google Charts API
         * if available
         * @returns {boolean} - Returns true is successful, or false
         * if not available
         */
        loadGoogleVisualization: function loadGoogleVisualization(chart) {

            // Using a try/catch block to guard against unanticipated
            // errors when loading the visualization lib
            try {

                // Arbitrary callback required in google.load() to
                // support loading after initial page rendering
                // google.charts.load('current', {packages: ['corechart', 'line']});
                google.charts.load('current', {
                    // google.charts.load("43", {
                    'packages': ['corechart', 'bar', 'line', 'geochart'], //'corechart', 'bar'
                    // 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                    'mapsApiKey': settings.map_api_key
                    // 'language': 'fa'
                });

                return true;
            } catch (e) {
                console.log('Could not load Google lib', e);
                return false;
            }
        }
    };
}]);
myApp.factory('excel', ['$window', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function base64(s) {
        return $window.btoa(unescape(encodeURIComponent(s)));
    },
        format = function format(s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };
    return {
        tableToExcel: function tableToExcel(tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
}]);

myApp.factory('generalData', ["$rootScope", function ($rootScope) {
    var generalData = {};
    $rootScope.generalData = {};
    return {
        set: function set(key, value) {
            generalData[key] = value;
            $rootScope.generalData = generalData;
            setTimeout(function () {
                $rootScope.$apply();
            }, 10);
        },
        get: function get() {
            return generalData;
        },
        check: function check(key) {
            if (generalData[key]) {
                return true;
            } else {
                return false;
            }
        },
        clear: function clear() {
            generalData = {};
            $rootScope.generalData = generalData;
            setTimeout(function () {
                $rootScope.$apply();
            }, 10);
        },
        hash: function hash(parameter) {
            var hash = sha1.create();
            hash.update(parameter);
            return hash.hex();
        }
    };
}]);
//https://github.com/rstacruz/nprogress
myApp.factory('loader', ['settings', '$filter', function (settings, $filter) {
    return {
        show: function show(element, position) {
            /**
             * check support Promise or not
             * when Not support promise , background color is #FFFBDD in ?force url
             */
            if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {

                NProgress.configure({ showSpinner: false, parent: "#body-content" });
                // $(element).fadeOut(0);
                // $(element).fadeIn(400);
                /**
                 * show git logo in center of page
                 * @type {string}
                 */

                var width = '30px';
                var time = 1;
                if (element === 'body' || element === 'html') {
                    width = '150px';
                    time = 0;
                }

                setTimeout(function () {
                    var loader = '';
                    if (position === 'btn') {
                        loader = '<div class="service-loading"><div class="loaderInPage loaderInPageBtn"></div></div>';
                    } else {
                        loader = '<div class="service-loading"><div class="loaderInPage"></div></div>';
                    }
                    $(element).append(loader);
                }, time);
                // setTimeout(() => {
                //     if (!$('.sk-wave').hasClass('sk-wave-text'))
                //         $(".sk-wave").append(`<div class="sk-wave-text">${$filter('translate')('loading_text')}</div>`)
                // }, 5000)
                NProgress.start();
            }
        }, hide: function hide(element) {
            /**
             * remove image from page center
             */
            // let className = element + ' .loaderInPage';
            var className = element + ' .service-loading';

            var time = 1;
            // let time = 600;
            if (element === 'body' || element === 'html') {
                time = 0;
            }
            setTimeout(function () {
                $(className).remove();
            }, time);
            NProgress.done();
        }
    };
}]);

myApp.factory('permissions', ['settings', '$rootScope', function (settings, $rootScope) {

    return {
        check: function check(permission) {
            var permissions = $rootScope.generalData['permissions'] || [];
            var findPermissions = permissions.find(function (i) {
                return i === permission;
            });
            if (findPermissions) {
                return true;
            } else {
                return false;
            }
        }
    };
}]);
myApp.factory('settings', ['$q', '$http', function ($q, $http) {
    /**
     * data of this variable fill from config file
     * views/resource/js/config.js
     * @type {string}
     */
    var mode = window.enviroment; //development || production
    return {
        defaultLanguage: window.defaultLanguage,
        rateCount: 5,
        rateValue: 2,
        serverPath: mode === 'development' ? "" : '',
        pageRecords: 24,
        reloadTime: {
            second: 25000,
            minute: 600000,
            hour: 36000000
        },
        maxAnimationTime: 1000,
        minAnimationTime: 0,
        debounceTime: 400,
        debounceTimeSearch: 1300,
        maxFileUploadSize: 524288000,
        maskDateSample: '1397/01/01',
        maskDate: '1399/19/39',
        maskNationalId: '999-999999-9',
        maskMobileNumber: '0999 999 9999',
        maskNationalIdLegal: '999-999999-99',
        maskMobileNumberSample: '09123456789',
        maskDateTimeSample: '1397/01/01 12:00',
        maskDateTime: '1399/19/39 29:59',
        maskIBANNumber: '99 9999 9999 9999 9999 9999 99',
        maskIBANNumberSample: 'xx xxxx xxxx xxxx xxxx xxxx xx',
        maskCommercialId: '999999999999',
        maskCommercialIdSample: '411356478901',
        regexName: /^[^\\\\\/\?\%\*\:\|\"<>]+$/,
        regexRemoveExtraCharacter: /[^\w]/gi,
        regexText: /\s/,
        regexEmail: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        regexWebsite: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        regexPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        formatDateTime: "jYYYY/jM/jD HH:mm",
        formatDateTimeSe: "jYYYY/jM/jD HH:mm:ss",
        formatDate: "jYYYY/jM/jD",
        emailSample: 'username@example.com',
        websiteSample: 'www.example.com',
        maskPostalCode: "99999-99999",
        maskPostalCodeSample: "33157-44111",
        phoneNumberSample: '02182345678',
        map_api_key: getRandomGoogleApiKey(),
        pageCountList: ['10', '20', '50', '100'],
        errorNotificationTime: 6000,
        successNotificationTime: 4000,
        otherNotificationTime: 2000,
        chartColor: ['#AD1457'],
        recaptcha: {
            // key: '6LfSXT0UAAAAAGqHddxbj9uJRI53ueJiFTZhvrs9',
            // key: '6LeKJR4TAAAAAB2ocGzOsNdhVtgmoyxmcsuJdMum'
        }

    };

    function getRandomGoogleApiKey() {
        var apiList = ["AIzaSyB8qnL2aMVa62xQu_Vf2m9qdafTPLpLCDs", "AIzaSyAPZVX5eXLVxw0QhDr3JGcChQE7zOo-7b4", "AIzaSyBHD9AGnQl5aCx1uDwNuAQNlRC0DewQpAM", "AIzaSyCPM5zbycZN0rXTCKXW92CwsDGc9kClrgg", "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"];
        return apiList[Math.floor(Math.random() * apiList.length)];
    }
}]);
// myApp
//     .factory('socket', ['$sailsSocket', function ($sailsSocket) {
//         return $sailsSocket({
//             baseUrl :'http://localhost:7000'
//         })
//
//     }]);
myApp.factory('validator', ['settings', '$filter', function (settings, $filter) {
    var regexText = settings.regexText;
    var regexEmail = settings.regexEmail;
    var regexRemoveExtraCharacter = settings.regexRemoveExtraCharacter;
    var regexWebsite = settings.regexWebsite;
    var regexPassword = settings.regexPassword;
    var validator = {
        validateText: function validateText(text, type) {
            if (text) {
                if (regexText.test(text)) {
                    return 'wrong_phrase';
                } else {
                    return 'valid';
                }
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }
        },
        validateEmail: function validateEmail(text, type) {
            if (text) {
                if (!regexEmail.test(text)) {
                    return 'wrong_email';
                } else {
                    return 'valid';
                }
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }
        },
        validateWebsite: function validateWebsite(text, type) {
            if (text) {
                if (!regexWebsite.test(text)) {
                    return 'wrong_website';
                } else {
                    return 'valid';
                }
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }
        },
        validateLength: function validateLength(text, type, length) {
            if (text && text.length !== length) {
                return 'wrong_phrase';
            } else if (type === 'require' && !text) {
                return 'is_required';
            } else {
                return 'valid';
            }
        },
        validateExist: function validateExist(text, type) {
            text = text ? text.toString() : '';
            if (text) {
                return 'valid';
            } else {
                if (type === 'require') {
                    return 'is_required';
                } else {
                    return 'valid';
                }
            }
        },
        validateNumber: function validateNumber(number, type, min, max, equal) {
            number = number ? number : 0;
            if (typeof equal === 'number' && number === equal) {
                return 'valid';
            } else if (typeof number !== 'number' && type) {
                return 'is_required';
            } else if (typeof min === 'number' && number < min) {
                return $filter('translate')('must_greeter_than') + ' ' + min + ' ' + $filter('translate')('be');
            } else if (typeof max === 'number' && number > max) {
                return $filter('translate')('must_less_than') + ' ' + max + ' ' + $filter('translate')('be');
            } else {
                return 'valid';
            }
        },
        validatePassword: function validatePassword(password) {
            if (password) {
                if (!regexPassword.test(password)) {
                    return 'wrong_password';
                } else {
                    return 'valid';
                }
            } else {
                return 'is_required';
            }
        },
        validateConfirmPassword: function validateConfirmPassword(password, confirmPassword) {
            if (confirmPassword) {
                if (confirmPassword === password) {
                    return 'valid';
                } else {
                    return 'wrong_confirm_password';
                }
            } else {
                return 'is_required';
            }
        },
        validateIBANNumber: function validateIBANNumber(text, type) {
            /*
            * Returns 1 if the IBAN is valid
            * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
            * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
            */

            if (type === 'require' && !text) {
                return 'is_required';
            }
            text = text.replace(/\s/g, '');
            // https://jsfiddle.net/kf332bhj/1/
            // http://hesabdaresabz.com/acc/acceducation/109-%D8%A7%D9%84%DA%AF%D9%88%D8%B1%DB%8C%D8%AA%D9%85-%D8%A7%D8%B9%D8%AA%D8%A8%D8%A7%D8%B1%D8%B3%D9%86%D8%AC%DB%8C-%DA%A9%D8%AF-%D8%B4%D8%A8%D8%A7%DB%8C-%D8%A8%D8%A7%D9%86%DA%A9%DB%8C.html
            var CODE_LENGTHS = {
                AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
                CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
                FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
                HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
                LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
                MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
                RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26,
                IR: 26, AL: 28, DZ: 24, AO: 25, BJ: 28, BF: 27, BI: 16, CM: 27, CV: 25,
                GE: 22, CI: 28, MG: 27, ML: 28, MZ: 25, SN: 28, VG: 24
            };
            var iban = String(text).toUpperCase().replace(/[^A-Z0-9]/g, ''),
                // keep only alphanumeric characters
            code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/),
                // match and capture (1) the country code, (2) the check digits, and (3) the rest
            digits = void 0;
            // check syntax and length
            if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
                return 'invalid_length_iban';
            }
            // rearrange country code and check digits, and convert chars to ints
            digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
                return letter.charCodeAt(0) - 55;
            });
            // final check
            if (mod97(digits) === 1) {
                return 'valid';
            } else {
                return 'wrong_iban';
            }
        },
        validateNationalId: function validateNationalId(nationalId, type) {
            if (type === 'require' && !nationalId) {
                return 'is_required';
            }
            nationalId = nationalId.replace(regexRemoveExtraCharacter, '');
            if (nationalId) {
                if (nationalId.length < 10 || nationalId.length > 10) {
                    return 'invalid_national_id';
                } else {
                    if (nationalId === '1111111111' || nationalId === '2222222222' || nationalId === '3333333333' || nationalId === '4444444444' || nationalId === '5555555555' || nationalId === '6666666666' || nationalId === '7777777777' || nationalId === '8888888888' || nationalId === '9999999999') {
                        return 'valid';
                    } else {
                        c = parseInt(nationalId.charAt(9));
                        n = parseInt(nationalId.charAt(0)) * 10 + parseInt(nationalId.charAt(1)) * 9 + parseInt(nationalId.charAt(2)) * 8 + parseInt(nationalId.charAt(3)) * 7 + parseInt(nationalId.charAt(4)) * 6 + parseInt(nationalId.charAt(5)) * 5 + parseInt(nationalId.charAt(6)) * 4 + parseInt(nationalId.charAt(7)) * 3 + parseInt(nationalId.charAt(8)) * 2;
                        r = n - parseInt(n / 11) * 11;
                        if (r === 0 && r === c || r === 1 && c === 1 || r > 1 && c === 11 - r) {
                            return 'valid';
                        } else {
                            return 'invalid_national_id';
                        }
                    }
                }
            } else {
                if (type === 'require') {
                    return 'is_required';
                } else {
                    return 'valid';
                }
            }
        }

    };

    function mod97(string) {
        var checksum = string.slice(0, 2),
            fragment = void 0;
        for (var offset = 2; offset < string.length; offset += 7) {
            fragment = String(checksum) + string.substring(offset, offset + 7);
            checksum = parseInt(fragment, 10) % 97;
        }
        return checksum;
    }

    return validator;
}]);
/**
 * get timestamp number and generate persian date with 1396/04/01 format
 * https://github.com/jalaali/moment-jalaali
 */
myApp.filter('toJalaliDate', function () {
    return function (time, format) {
        /**
         * return persian format date with jalali moment bower
         */
        //'jYYYY/jM/jD HH:mm'
        format = format || 'jYYYY/jM/jD';
        return moment(time).format(format);
    };
});
/**
 * get timestamp number and generate persian date with 1396/04/01 format
 * https://libraries.io/bower/persian-date
 */
myApp.filter('toPersianDate', function () {
    return function (time, format) {
        /**
         * return persian format date with persianDate bower
         */
        //
        if (format) {
            return persianDate(time).format(format);
        } else {
            return persianDate(time).format('L');
        }
    };
});
myApp.service('appService', ['$http', 'settings', '$state', 'generalData', function ($http, settings, $state, generalData) {
    var resourceName = settings.serverPath;
    var generalDataObject = generalData.get();
    Array.prototype.numberSort = function () {
        if (this.length) return this.sort(function (a, b) {
            return a - b;
        });
    };
    Object.defineProperty(Object.prototype, "length", {
        enumerable: false,
        value: function value() {
            return Object.keys(this).length;
        }

    });

    Array.prototype.clone = function () {
        return this.slice().map(function (el) {
            return _extends({}, el);
        });
    };

    var appService = {
        'post': function post(params, urlType) {
            return new Promise(function (resolve, reject) {
                /**
                 * create structure for get data from server api
                 * @type {{method: string, url: *, data, headers: {Content-Type: string}}}
                 */
                var theOption = {
                    method: 'POST',
                    url: urlType === 'absolute' ? params.url : resourceName + '/ws/' + params.url,
                    data: params.data,
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                /**
                 * call server with angular $http
                 */
                theOption.data['marketPort'] = generalDataObject['marketPort'];
                console.log("theOption in appService", theOption);
                $http(theOption).then(function (response) {
                    console.log("response :: ", response);
                    resolve(response);
                }, function (error) {
                    console.log("error :: ", error);
                    if (error.status === 401) {
                        setTimeout(function () {
                            var beforeLogin = ['root.signin', 'root.signup', 'root.recoverPassword'];
                            if ($state['current'] && $state['current']['name'] && !beforeLogin.includes($state['current']['name'])) {
                                generalData.clear();
                                $state.go('root.signin');
                            }
                        }, 1200);
                    }
                    reject(error);
                });
            });
        }

    };
    return appService;
}]);

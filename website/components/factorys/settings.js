myApp.factory('settings', ['$q', '$http', function ($q, $http) {
    /**
     * data of this variable fill from config file
     * views/resource/js/config.js
     * @type {string}
     */
    let mode = window.enviroment; //development || production
    return {
        defaultLanguage: window.defaultLanguage,
        rateCount: 5,
        rateValue: 2,
        serverPath: (mode === 'development') ? "" : '',
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
        maskIBANNumber : '99 9999 9999 9999 9999 9999 99',
        maskIBANNumberSample : 'xx xxxx xxxx xxxx xxxx xxxx xx',
        maskCommercialId : '999999999999',
        maskCommercialIdSample : '411356478901',
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
        errorNotificationTime : 6000,
        successNotificationTime : 4000,
        otherNotificationTime : 2000,
        chartColor : ['#AD1457'],
        recaptcha : {
            // key: '6LfSXT0UAAAAAGqHddxbj9uJRI53ueJiFTZhvrs9',
            // key: '6LeKJR4TAAAAAB2ocGzOsNdhVtgmoyxmcsuJdMum'
        }




    };

    function getRandomGoogleApiKey() {
        let apiList = [
            "AIzaSyB8qnL2aMVa62xQu_Vf2m9qdafTPLpLCDs",
            "AIzaSyAPZVX5eXLVxw0QhDr3JGcChQE7zOo-7b4",
            "AIzaSyBHD9AGnQl5aCx1uDwNuAQNlRC0DewQpAM",
            "AIzaSyCPM5zbycZN0rXTCKXW92CwsDGc9kClrgg",
            "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
        ];
        return apiList[Math.floor(Math.random() * apiList.length)];
    }


}]);
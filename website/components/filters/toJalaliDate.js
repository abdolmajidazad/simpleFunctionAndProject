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
        return moment(time).format(format)

    };
});
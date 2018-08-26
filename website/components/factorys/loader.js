//https://github.com/rstacruz/nprogress
myApp.factory('loader', ['settings', '$filter', function (settings, $filter) {
    return {
        show: function (element, position) {
            /**
             * check support Promise or not
             * when Not support promise , background color is #FFFBDD in ?force url
             */
            if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {

                NProgress.configure({ showSpinner: false, parent:"#body-content" });
                // $(element).fadeOut(0);
                // $(element).fadeIn(400);
                /**
                 * show git logo in center of page
                 * @type {string}
                 */

                let width = '30px';
                let time = 1;
                if (element === 'body' || element === 'html') {
                    width = '150px';
                    time = 0
                }

                setTimeout(function () {
                    let loader = '';
                    if (position === 'btn') {
                        loader = `<div class="service-loading"><div class="loaderInPage loaderInPageBtn"></div></div>`
                    } else {
                        loader = `<div class="service-loading"><div class="loaderInPage"></div></div>`
                    }
                    $(element).append(loader);
                }, time);
                // setTimeout(() => {
                //     if (!$('.sk-wave').hasClass('sk-wave-text'))
                //         $(".sk-wave").append(`<div class="sk-wave-text">${$filter('translate')('loading_text')}</div>`)
                // }, 5000)
                NProgress.start();

            }

        }, hide: function (element) {
            /**
             * remove image from page center
             */
                // let className = element + ' .loaderInPage';
            let className = element + ' .service-loading';

            let time = 1;
            // let time = 600;
            if (element === 'body' || element === 'html') {
                time = 0
            }
            setTimeout(() => {
                $(className).remove();
            }, time);
            NProgress.done();

        }
    };
}]);

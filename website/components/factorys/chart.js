//https://github.com/rstacruz/nprogress
myApp.factory('ChartService', ['settings',function(settings) {
    return {

        /**
         * Loads the visualization module from the Google Charts API
         * if available
         * @returns {boolean} - Returns true is successful, or false
         * if not available
         */
        loadGoogleVisualization: function(chart) {

            // Using a try/catch block to guard against unanticipated
            // errors when loading the visualization lib
            try {

                // Arbitrary callback required in google.load() to
                // support loading after initial page rendering
                // google.charts.load('current', {packages: ['corechart', 'line']});
                google.charts.load('current', {
                // google.charts.load("43", {
                    'packages':['corechart', 'bar','line','geochart'],//'corechart', 'bar'
                    // 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                    'mapsApiKey': settings.map_api_key,
                    // 'language': 'fa'
                });

                return true;

            } catch(e) {
                console.log('Could not load Google lib', e);
                return false;
            }

        }
    };
}]);
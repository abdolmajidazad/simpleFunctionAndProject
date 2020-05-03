$(document).ready(function() {
	var map = $.sMap({
		element: '#map',
        apiKey:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwNDcwNWU0ZTI1ZGYyMTA5MzRmZjRjMGM5ODM0NDQwNTgzYzBkZTFlYWU2ODljMGYzZTM2M2VkNzJjNDBmNzEzMTAzYTA4Y2QxZmFhMzY1In0.eyJhdWQiOiI0MDQ4IiwianRpIjoiZDA0NzA1ZTRlMjVkZjIxMDkzNGZmNGMwYzk4MzQ0NDA1ODNjMGRlMWVhZTY4OWMwZjNlMzYzZWQ3MmM0MGY3MTMxMDNhMDhjZDFmYWEzNjUiLCJpYXQiOjE1NzYzOTI4MDYsIm5iZiI6MTU3NjM5MjgwNiwiZXhwIjoxNTc4MzgwMDA2LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.sAwZd6N0ThhHhIgEBUyArtH_P_Xf5A8KXdSYvtwxCNoWkrq3tyVRJlkhVzTB8uhV5pGwVgemUcmMIvVV7YjkV1AE1btPcucsiZ4oRvG4jGA82XNUvOmdZ4UxeN2Y8TuqhjijMYUmSNS20SHa1jt-FgGJSh_AdclWOQuwChG2iumRcJpslcFciD3wU5PpHKXwZjpV2iL8ByMCOHMG2jaPebqXj6yMHsxRP0sgKepWySrKwOuVe68ML-HSw8mOeNRaUID-XEtv5pOMtaEjv8lv6-zPmZQdePWHHkPurwgCn4wFUhev1T7MUuekNPrZjgVRDDoFaagx7jRkrw2xuawMMA',
        presets: {
			latlng: {
                lat: 35.7478347,
                lng: 51.3363876,
			},
			zoom: 15,
		},
	});

	$.sMap.layers.static.build({
		layers: {
			base: {
				default: {
					server: 'https://map.ir/shiveh',
					layers: 'Shiveh:ShivehNOPOI',
					format: 'image/png',
				},
			},
		},
	});

	$.sMap.features();
    $.sMap.logo.implement({
        url: '/app/assets/logo.png',
    });

	$.sMap.features.marker.create({
        before: function() {
            console.log('Before');
        },
        after: function() {
            console.log('After');
        },
		name: 'majid azad',
		popup: {
			title: {
				html: 'nam sherkat',
				i18n: '',
			},
			description: {
				html: 'darbare sherkat',
				i18n: '',
			},
		},
		latlng: {
			lat: 35.7478347,
			lng: 51.3363876,
		},
        icon: icons.poi.restaurant,
        popupOpen: true,
        pan: false,
        draggable: true,
        on: {
            click: function(){
                console.log('click callback');
            },
            contextmenu: function(){
                console.log('contextmenu callback');
            },
        },
	});

})

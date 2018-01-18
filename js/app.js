// declare global variables
var map;
var markers = [];

function ViewModel() {
	myLocations: ko.observableArray();

}

function initMap () {
	var losAngeles = {
		lat: 34.052235,
		lng: -118.243683
	};

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: losAngeles
	});

	var bounds = new google.maps.LatLngBounds();

	var infowindow = new google.maps.InfoWindow({
		content: 'First Info Window'
	});

	// locations.addListener('click', function() {
	// 	infowindow.open(map, locations);
	// });

	// Create the markers
	for (var i = 0; i < myLocations.length; i++) {
		var lat = myLocations[i].lat;
		var lng = myLocations[i].lng;
		var title = myLocations[i].title;

		var marker = new google.maps.Marker({
			map: map,
			position: {
				lat: lat,
				lng: lng
			},
			title: title,
			animation: google.maps.Animation.DROP
		}); 

		markers.push(marker);
		// Extend boundaries to the each marker 
		bounds.extend(marker.position);
		marker.addListener('click', function() {
			console.log(this.title + 'marker clicked');
			// populateInfoWindow(this. largeInfowindow);
		});
	}
	map.fitBounds(bounds);
}


// Side Nav button
function openNav() {
    document.getElementById("list-sidebar").style.width = "250px";
    document.getElementById("map").style.marginRight = "250px";
    $('#list-sidebar').toggleClass('nav-close');
    $('#list-sidebar').toggleClass('nav-open');
}

function closeNav() {
    document.getElementById("list-sidebar").style.width = "0";
    document.getElementById("map").style.marginRight = "0";
    $('#list-sidebar').toggleClass('nav-open');
    $('#list-sidebar').toggleClass('nav-close');

}

$('.menu-btn').click(function() {
	if($('#list-sidebar').hasClass('nav-open')) {
		closeNav();
	}
	else if($('#list-sidebar').hasClass('nav-close')) {
		openNav();
	}
})


// Location markers
var myLocations = [
	{
		title: 'Cafe Laurent',
		lat: 34.011826,
		lng: -118.400865,
		type: 'Restaurant'
	},
	{
		title: 'The Butcher, The Baker, The Cappuccino Maker',
		lat: 34.092133,
		lng: -118.380580,
		type: 'Restaurant'

	},
	{
		title: 'Ktch DTLA',
		lat: 34.042670,
		lng: -118.234905,
		type: 'Restaurant'
	},
	{
		title: 'Urth Cafe Santa Monica',
		lat: 34.004401,
		lng: -118.485788,
		type: 'Restaurant'
	},
	{
		tite: 'JiST Cafe',
		lat: 34.050773,
		lng: -118.240377,
		type: 'Restaurant'
	},
	{
		title: 'Republique',
		lat: 34.064158,
		lng: -118.343679,
		type: 'Restaurant'
	},
	{
		title: "Eggslut",
		lat: 34.050655,
		lng: -118.248795,
		type: 'Restaurant'
	},
	{
		title: 'La Grande Orange Cafe',
		lat: 34.141424,
		lng: -118.148583,
		type: 'Restaurant'
	}, 
	{
		title: 'The Independence',
		lat: 34.013850,
		lng: -118.495400,
		type: 'Restaurant'
	}
]


	ko.applyBindings(new ViewModel());


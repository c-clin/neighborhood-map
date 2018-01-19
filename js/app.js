// declare global variables
var map;
var markers = [];
<<<<<<< HEAD
var clientID;
var clientSecret;

||||||| merged common ancestors

=======
 
>>>>>>> sidenav-btn
function ViewModel() {
<<<<<<< HEAD
	var self = this;
	var myLocations = ko.observableArray();

}


function initMap () {

	var self = this;

	var losAngeles = {
		lat: 34.052235,
		lng: -118.243683
	};

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: losAngeles
	});

	var infowindow = new google.maps.InfoWindow({
		content: 'First Info Window'
	});

	// locations.addListener('click', function() {
	// 	infowindow.open(map, locations);
	// });


	// Foursquare api
	clientID = "VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0"
	clientSecret = "WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO"
	url: "https://api.foursquare.com/v2/venues/search?ll=" + markers.lat + "," + markers.lng + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180119"
	"https://api.foursquare.com/v2/venues/search?ll=" + markers.lat + "," + markers.lng;

	


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

		marker.addListener('click', function() {
			console.log(this.title + 'marker clicked');
			// populateInfoWindow(this. largeInfowindow);
		});
	}
||||||| merged common ancestors
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

		marker.addListener('click', function() {
			console.log(this.title + 'marker clicked');
			// populateInfoWindow(this. largeInfowindow);
		});
	}
=======
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
    //  infowindow.open(map, locations);
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
>>>>>>> sidenav-btn
}
<<<<<<< HEAD


	ko.applyBindings(new ViewModel());

||||||| merged common ancestors



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

=======
 
 
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    $('#mySidenav').toggleClass('nav-close');
        $('#mySidenav').toggleClass('nav-open');
}
 

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    $('#mySidenav').toggleClass('nav-close');
        $('#mySidenav').toggleClass('nav-open');
 
}
// Toggle the menu icon  
$('.menu-btn').click(function() {
    if(document.getElementById("mySidenav").style.width == "250px") {
    	return closeNav();
    }
 	return openNav();
})
 
    ko.applyBindings(new ViewModel());
>>>>>>> sidenav-btn

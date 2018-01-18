// declare global variables
var map;
var markers = [];
var clientID;
var clientSecret;

function ViewModel() {
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
}


	ko.applyBindings(new ViewModel());


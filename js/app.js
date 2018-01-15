// declare global variables
var map;

function initMap () {
	var losAngeles = {
		lat: 34.052235,
		lng: -118.243683
	};

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: losAngeles,
		mapTypeControl: false
	});
}
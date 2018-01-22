// declare global variables
var map;
var markers = [];
var clientID;
var clientSecret;

// View Model
function ViewModel() {
	var self = this;

	var myLocations = ko.observableArray([]);

}

// Side Nav Functions
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
    console.log('menu clicked');
    if(document.getElementById("mySidenav").style.width == "250px") {
    	return closeNav();
    }
 	return openNav();
})
 

 // Model 
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
 

    self.bounds = new google.maps.LatLngBounds();

    self.largeInfowindow = new google.maps.InfoWindow({
        content: ''
    });
    
    // Foursquare api
    clientID = "VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0";
    clientSecret = "WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO";
    
    
    // Making the api request
    self.infowindowContent = function(marker) {
        var url = "https://api.foursquare.com/v2/venues/search?ll=" + marker.lat + "," + marker.lng + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180119";
        $.getJSON(url).done(function(data) {
            var results = data.response.venues[0];
            title = results.name;
            phone = results.formattedPhone;
            street = results.formattedAddress[0];
            city = results.formattedAddress[1];
            country = results.formattedAddress[2];
            checkIns = results.stats.checkinsCount;
            url = url; 
    }). fail(function() {
        console.log("There was an error loading the Foursquare API. Please try again later.")
        console.log(results);
        })
    }     

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
            animation: google.maps.Animation.DROP,
            visiblity: ko.observable(true)
        }); 
        self.infowindowContent(marker);
        self.markers.push(marker);

        // Extend boundaries to the each marker 
        self.bounds.extend(marker.position);
        marker.addListener('click', function() {
            largeInfowindow.setContent(contentString);
            largeInfowindow.open(map, this); 
            // populateInfoWindow(this. largeInfowindow);
        });
    }

    self.populateInfoWindow = function(marker, largeInfowindow) {
        //check to make sure the info window is not already opened
        if(largeInfowindow.marker != marker) {
            largeInfowindow.marker = marker;
            largeInfowindow.setContent();
            largeInfowindow.open(map, marker);
            // make sure the marker property is cleare if the infowindow is closed
            largeInfowindow.addListener('closeclick', function() {
                largeInfowindow.setMarker(null);
            })
        }
    }

    map.fitBounds(bounds);
    
    
    // Content for the infowindow
    // var contentString = '<div class="infowindow">' + 
    //         '<h2>' + data.name + '</h2>' +
    //         '<p><a href="' + data.url +'">' + data.url + '</a></p>' +
    //         '<p>' + data.street + '</p>' +
    //         '<p>' + data.city + '</p>' +
    //         '<p>' + data.country + '</p>' +
    //         '<p>Number of checkins:' + checkins + '</p>' +
    //         '<p>' + data.phone + '</p></div>';

    // create info window
}

ko.applyBindings(new ViewModel());

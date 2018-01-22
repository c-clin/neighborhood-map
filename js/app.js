// declare global variables
var map;
var markers = [];
var clientID;
var clientSecret;

// View Model
function ViewModel() {

    var self = this;    

    this.searchBox = ko.observable('');


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
 
    // create bounds to the map
    self.bounds = new google.maps.LatLngBounds();
    // create info window
    self.largeInfowindow = new google.maps.InfoWindow({
        content: ''
    });
    
    // Foursquare api
    clientID = "VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0";
    clientSecret = "WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO";
    
    // Making the api request
    self.infowindowContent = function(marker) {
        var url = "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180119";
        $.getJSON(url).done(function(data) {
            var results = data.response.venue;
            console.log(results);
            title = results.name;
            phone = results.contact.formattedPhone;
            street = results.location.formattedAddress[0];
            city = results.location.formattedAddress[1];
            country = results.location.formattedAddress[2];
            checkIns = results.stats.checkinsCount;
            url = url; 
    }). fail(function() {
        console.log("There was an error loading the Foursquare API. Please try again later.")
        })
    }     

    // Create the markers
    for (var i = 0; i < myLocations.length; i++) {
        var lat = myLocations[i].lat;
        var lng = myLocations[i].lng;
        var title = myLocations[i].title;
        var id = myLocations[i].id;

        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: lat,
                lng: lng
            },
            title: title,
            id: id,
            animation: google.maps.Animation.DROP,
            visiblity: ko.observable(false)
        }); 
        self.infowindowContent(marker);
        self.markers.push(marker);
        marker.addListener('click', markerClickHandler);



        // Extend boundaries to the each marker 
        self.bounds.extend(marker.position);
    }


    self.populateInfoWindow = function(marker, largeInfowindow) {
        // check to make sure the info window is not already open
        if(self.largeInfowindow.marker != marker) {
            self.largeInfowindow.marker = marker;
            var contentString = '<div class="infowindow">' + 
            '<h4>' + marker.title + '</h4>' +
            '<p><a href="' + marker.url +'">' + marker.url + '</a></p>' +
            '<p>' + marker.street + '</p>' +
            '<p>' + marker.city + '</p>' +
            '<p>' + marker.country + '</p>' +
            '<p>Number of checkins:' + marker.checkIns + '</p>' +
            '<p>' + marker.phone + '</p></div>';
            self.largeInfowindow.setContent(contentString);
            self.largeInfowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed
            self.largeInfoWindow.addListener('closeclick', function() {
                self.largeInfowindow.setMarker(null);
            });
        }
    }
    // Adds animation to the marker when clicked
    function toggleBounce() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    // Create a click handler for the markers
    function markerClickHandler() {
        self.populateInfoWindow(this, largeInfowindow);
        toggleBounce();

    }
}

ko.applyBindings(new ViewModel());


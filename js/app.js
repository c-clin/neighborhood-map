// declare global variables
var map;
var markers = [];
var clientID;
var clientSecret;


// View Model
function ViewModel() {

    var self = this;    

    // Create a blank search box
    this.searchBox = ko.observable('');

    // Create a blank array for the locations
    this.locations = ko.observableArray();

    // Push the location list into the new ko variable array
    myLocations.forEach(function(item){
        self.locations.push(item.title);
    });

    // Allows the searchbox to only return what the user types that are available
    this.filteredList = ko.computed(function() {
        var filter = this.searchBox().toLowerCase();
        if(!filter) {
            self.locations().forEach(function(location){
                // Set all the markers to visible
            })
            return self.locations();
        } else {
            return ko.utils.arrayFilter(self.locations(), function(location) {
                // Returns true if user's query matches the locations
                return location.toLowerCase().indexOf(filter) != -1;    
                if (marker.title = location) {
                }
            });
        }
    }, this);
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
        content: '',
        maxWidth: 280
    });
    
    // Foursquare api
    clientID = "VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0";
    clientSecret = "WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO";
    
    // Making the api request
    self.infowindowContent = function(marker) {
        var url = "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180119";
        $.getJSON(url).done(function(data) {
            var results = data.response.venue;
            marker.title = results.name;
            marker.phone = results.contact.formattedPhone;
            if (typeof marker.phone === 'undefined') {
                marker.phone = '';
            }
            marker.street = results.location.formattedAddress[0];
            marker.city = results.location.formattedAddress[1];
            marker.country = results.location.formattedAddress[2];
            marker.checkIns = results.stats.checkinsCount;
            marker.url = url; 
            console.log(marker.url);
    }). fail(function() {
        alert("There was an error loading the Foursquare API. Please try again later.")
        })
    }     

    // Adds animation to the marker when clicked
    function toggleBounce(marker) { //Only works on one marker
        // console.log(marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){marker.setAnimation(null); }, 750);
    }

    // Create a click handler for the markers
    function markerClickHandler() {
        self.populateInfoWindow(this, largeInfowindow);
        toggleBounce(this);
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
            visiblity: ko.observable(true)
        }); 
        self.infowindowContent(marker);
        self.markers.push(marker);
        marker.addListener('click', markerClickHandler);



        // Extend boundaries to the each marker 
        self.bounds.extend(marker.position);
    }

    // Infowindow content
    self.populateInfoWindow = function(marker, largeInfowindow) {
        // check to make sure the info window is not already open
        if(self.largeInfowindow.marker != marker) {
            self.largeInfowindow.marker = marker;
            var contentString = '<div class="infowindow">' + 
            '<h4>' + marker.title + '</h4>' +
            '<p>' + marker.phone + '</p>' +
            '<a href="' + marker.url + '">Website</a>' + //why is url not showing
            '<p>' + marker.street + '</p>' +
            '<p>' + marker.city + '</p>' +
            '<p>' + marker.country + '</p>' +
            '<p>Number of checkins: ' + marker.checkIns + ' times</p>';
            self.largeInfowindow.setContent(contentString);
            self.largeInfowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed
            // self.largeInfoWindow.addListener('closeclick', function() {
            //     self.largeInfowindow.setMarker(null);
            // });
        }
    }

}

ko.applyBindings(new ViewModel());


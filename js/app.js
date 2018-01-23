<<<<<<< HEAD
||||||| merged common ancestors
// declare global variables
var map;
var markers = [];
var clientID;
var clientSecret;

=======

>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
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
    if(document.getElementById("mySidenav").style.width == "250px") {
        return closeNav();
    }
    return openNav();
})
<<<<<<< HEAD

// View Model
function ViewModel() {

    var self = this;    

    self.markers = ko.observableArray([]);

    // Create a blank search box
    this.searchBox = ko.observable('');

    // Create a blank array for the locations
    this.locations = ko.observableArray();

||||||| merged common ancestors
 

 // Model 
function initMap () {
    var self = this;

    // Center point for the map
    var losAngeles = {
        lat: 34.052235,
        lng: -118.243683
    };
 
    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        styles: styles,
        center: losAngeles
    });
 
    // create bounds to the map
    self.bounds = new google.maps.LatLngBounds();
=======
 
// View Model
function ViewModel() {

    var self = this;    
    self.markers = ko.observableArray([]);

    // Create a blank search box
    this.searchBox = ko.observable('');

    // Create a blank array for the locations
    this.locations = ko.observableArray();
    
    self.mrk = function() {
        if (this.searchBox().length === '') {
            this.showAll();
        } else {
            for (var i = 0; i < myLocations.length; i++) {
                if (myLocations[i].title.indexOf(this.searchBox().toLowerCase()) >= 0) {
                    self.markers()[i].setVisible(true);
                    self.markers()[i].visiblity(true);
                } else {
                    self.markers()[i].visiblity(false);
                    self.markers()[i].setVisible(false);
                }
            }
        }
    };

>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
    // create info window
    self.largeInfowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 280
    });
<<<<<<< HEAD

||||||| merged common ancestors
    
    // Foursquare api
    clientID = "VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0";
    clientSecret = "WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO";
    
=======
    
>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
    // Making the api request
    self.infowindowContent = function(marker) {
<<<<<<< HEAD
        var url = "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id=VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0&client_secret=WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO&v=20180119";
  $.getJSON(url).done(function(data) {
||||||| merged common ancestors
        var url = "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180119";
        $.getJSON(url).done(function(data) {
=======
        var url = "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id=VQCP4ZVU0Z4O0BJZN2WK0O0WFZ3TTQJIZRPDEDJXKRB3BJJ0&client_secret=WHK5K4BWY0MOUAIPV0JSKEJJ5XJG2WPSC20KELWEBCGCVWYO&v=20180119";
        $.getJSON(url).done(function(data) {
>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
            var results = data.response.venue;
            console.log(results);
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
    }). fail(function() {
        console.log("There was an error loading the Foursquare API. Please try again later.")
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
        self.populateInfoWindow(this, this.largeInfowindow);
        toggleBounce(this);
    }

<<<<<<< HEAD
    // Create bounds to the map
    self.bounds = new google.maps.LatLngBounds();

||||||| merged common ancestors
=======
    
    // create bounds to the map
    self.bounds = new google.maps.LatLngBounds();
>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
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
            visible: true,
            visiblity: ko.observable(true)
        }); 
        self.infowindowContent(marker);
        self.markers().push(marker);
        marker.addListener('click', markerClickHandler);

        // Extend boundaries to each marker 
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

<<<<<<< HEAD
||||||| merged common ancestors
}

// View Model
function ViewModel() {

    var self = this;    

    // Create a blank search box
    this.searchBox = ko.observable('');

    // Create a blank array for the locations
    this.locations = ko.observableArray();

    console.log(markers);
=======


   
>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
    // Push the location list into the new ko variable array
    // self.markers().forEach(function(item){
    //     self.locations().push(item.title);

    // });
    console.log(self.markers()[1].title);

<<<<<<< HEAD

    // Allows the searchbox to only return what the user types that are available
    this.filteredList = ko.computed(function() {
        var filter = this.searchBox().toLowerCase();
        if(!filter) {
            self.markers().forEach(function(location){
                // Set all the markers to visible
                // location.visibility(true);
            })
            return self.markers();
        } else {
            return ko.utils.arrayFilter(self.locations(), function(location) {
                // Returns true if user's query matches the locations
                return location.toLowerCase().indexOf(filter) != -1;    
            });
||||||| merged common ancestors
    console.log(self.locations());

    // Allows the searchbox to only return what the user types that are available
    this.filteredList = ko.computed(function() {
        var filter = this.searchBox().toLowerCase();
        if(!filter) {
            self.locations().forEach(function(location){
                // Set all the markers to visible
                // location.visibility(true);
            })
            return self.locations();
        } else {
            return ko.utils.arrayFilter(self.locations(), function(location) {
                // Returns true if user's query matches the locations
                return location.toLowerCase().indexOf(filter) != -1;    
            });
=======
    self.showAll = function() {
        for (var i = 0; i < myLocations.length; i++) {
            self.markers()[i].visiblity(true);
            self.markers()[i].setMap(map);
>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708
        }
<<<<<<< HEAD
    }, this);
}
||||||| merged common ancestors
    }, this);
}


ko.applyBindings(new ViewModel());

=======
    };
    self.showAll();
}

>>>>>>> af590fb6d7b1a1fd1c7b75090d34526859250708

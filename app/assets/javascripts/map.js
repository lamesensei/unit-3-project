console.log('linked!')

mark = [];

// Initiates a map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 1.35721, lng: 103.8198}
  });
  var geocoder = new google.maps.Geocoder();

  initAutocomplete();

  $("#place").click(place);
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('test').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {772
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Inits the autocomplete functions
function initAutocomplete() {
  var input = document.getElementById('person')
  var options = {
      componentRestrictions: {country: "sg"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      document.getElementById("lat").value = lat;
      document.getElementById("lon").value = lng;
    });
}

function place() {
  let myLatLng = {lat: parseFloat($("#lat").val()), lng: parseFloat($("#lon").val())};

  if ( mark[0] != undefined ) {
    mark[0].setMap(null);
  }

  mark = [];
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
    mark.push(marker)
}

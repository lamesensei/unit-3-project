console.log('linked!');

const API_KEY = 'AIzaSyCM3MixfBEjbgbPdvlSEu8kubULJuXv9bg';

mark = [];
routes = [];

// Initiates a map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: { lat: 1.35721, lng: 103.8198 }
  });
  midMarker = null;
  infowindows = new google.maps.InfoWindow();
  directions = new google.maps.DirectionsService();
  renderer = new google.maps.DirectionsRenderer({
    suppressPolylines: true,
    infoWindow: infowindows,
    suppressMarkers: true
  });

  initAutocomplete();

  placeAllMarks();

  $("#calc").click(markMid);
  $("#currentLocation").click(getCurrentLocation);
}

function markPlace() {
  let myLatLng = { lat: parseFloat($('#lat').val()), lng: parseFloat($('#lon').val()) };

  // To avoid placing more than 1 marker
  if (mark[0] != undefined) {
    mark[0].setMap(null);
  }

  mark = [];
  marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
  map.setZoom(14);
  map.panTo(marker.position);
  mark.push(marker);
}

// Inits the autocomplete functions
function initAutocomplete() {
  var input = document.getElementById('person');
  var options = {
    componentRestrictions: { country: 'sg' }
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    var address = document.getElementById('person').value;
    document.getElementById('magicbutton').classList = 'btn btn-success m-0';
    document.getElementById('confirm').disabled = false;

    // Inputting values into hidden field
    document.getElementById('lat').value = lat;
    document.getElementById('lon').value = lng;
    document.getElementById('address').value = address;
    markPlace();
  });
}

// Function to get all hidden values of lats + longs
function getAll() {
  let totalLat = 0;
  let totalLon = 0;
  let length = 0;

  for (let i = 0; i < document.getElementsByClassName('lats').length; i++) {
    if (document.getElementsByClassName('lats')[i].textContent != "") {
      totalLat = totalLat + parseFloat(document.getElementsByClassName('lats')[i].textContent);
      length = length + 1;
    }
  }

  for (let i = 0; i < document.getElementsByClassName('lons').length; i++) {
    if (document.getElementsByClassName('lats')[i].textContent != "") {
      totalLon = totalLon + parseFloat(document.getElementsByClassName('lons')[i].textContent);
    }
  }

  let aveLat = totalLat / parseFloat(length);

  let aveLon = totalLon / parseFloat(length);

  midPoint = { lat: parseFloat(aveLat), lng: parseFloat(aveLon) };
}

function clearMarkers() {
  for (let i = 0; i < mark.length; i++) {
    mark[i].setMap(null);
  }
}

function markMid() {
  if ( midMarker != null ) {
    midMarker.setMap(null)
  }
  getAll();
  document.getElementById('resultmodalbutton').classList.remove('invisible');

  midMarker = new google.maps.Marker({
    position: midPoint,
    map: map,
    draggable: true,
    label: 'X'
  });
  map.setZoom(14);
  map.panTo(midMarker.position);
  findPlaces();
  showRoutes();
  // For reference only can remove later
  $('#dragLat').html(midMarker.position.lat());
  $('#dragLong').html(midMarker.position.lng());

  google.maps.event.addListener(midMarker, 'dragend', function(evt) {
    $('#dragLat').html(midMarker.position.lat());
    $('#dragLong').html(midMarker.position.lng());
  });

  // Drag to search feature
  google.maps.event.addListener(midMarker, 'dragend', function(evt) {
    clearList();
    findPlaces();
    showRoutes();
    // map.panTo(evt.latLng);
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  mark.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

function findPlaces() {
  clearMarkers();
  clearRoutes();

  routes = [];
  placesArr = [];

  getAll();

  var request = {
    location: { lat: midMarker.position.lat(), lng: midMarker.position.lng() },
    radius: 2000,
    type: $('#type').val(),
  };

  // Info pop up window
  infoWindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((result) => {
      placesArr.push(result);
    });
  }
  // Making marker for each place
  var len = placesArr.length;
  if (len > 0) {
    const LIST = $('#listBoard');
    $('#listBoard').show();
    const DETS = $('#listText');

    for (let i = 0; i < 10; i++) {
      places = placesArr[i];
      createMarker(places);


console.log(places);


      // Name
      let placeName = places.name;

      // Photo URL skip if place doesnt have photo
      if (places.photos[0] == undefined) {
        let photo = 'no-image.png';
      } else {
        // Photo URL
        let photo = places.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });

        // Rating (out of 5)
        let rating = places.rating;

        // Address
        let address = places.vicinity;

        // Creating the list (to be styled later)
        doc = document.createElement('div');

// here
        doc.innerHTML = `<div class="card">
        <div class="listText placeName h3 card-header">
            ${placeName}
        </div>
        <div>
            <img class="card-img-top" src=${photo} style="height: 15rem;"/>
        </div>
            <div class="card-body">
                <div class="rating h4">${rating} stars</div>
                    <div class="address">Address : ${address}</div>
                    </div>
                </div>
            </div>`;

        $('#listBoard').append(doc);
      }
    }
  }
}

function clearList() {
  let clear = document.getElementById('listBoard');
  while (clear.firstChild) {
    clear.removeChild(clear.firstChild);
  }
}

function fillCur() {
  // Inputting values into hidden fields when use current location button is pressed
  $("#lat").val(curLat);
  $("#lon").val(curLng);
  $("#address").val(address);
  $("#person").val(address);
  $("#lat").val(curLat);
  $("#lon").val(curLng);
  markPlace();
  $("#magicbutton")
}

function reverseGeocode() {
  $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${curLat},${curLng}&key=${API_KEY}`, function( data ) {
    address = data.results[0].formatted_address;
    fillCur();
    document.getElementById('magicbutton').classList = 'btn btn-success m-0';
    document.getElementById('confirm').disabled = false;
  })
}

function getCurrentLocation() {
  if ( navigator.geolocation ) {
    navigator.geolocation.getCurrentPosition(function(position){
       curLat = position.coords.latitude;
       curLng = position.coords.longitude;
       console.log('1')
       console.log(curLat)
       reverseGeocode();
    });
  } else {
    // Change button to say unabel to find location and removing the event listener
    $("#currentLocation").text() = "Unable to find location!";
    $("#currentLocation").unbind("click");
    $("#currentLocation").attr("class", "btn btn-danger");
  }
}

function markUsers(latLng, name) {
  let contentString = `<div>${name}</div>`;

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  })

  let markUser = new google.maps.Marker({
    map: map,
    position: latLng,
  })

  markUser.addListener('click', function() {
    infowindow.open(map, markUser);
  })
}

function placeAllMarks() {

  for ( let i = 0; i < document.getElementsByClassName("allNames").length; i++ ) {
    if ( document.getElementsByClassName("lats")[i] != null ) {
      let tempName = document.getElementsByClassName("allNames")[i].textContent;
      let tempLat = parseFloat(document.getElementsByClassName("lats")[i].textContent);
      let tempLng = parseFloat(document.getElementsByClassName("lons")[i].textContent);
      let tempLatLng = {lat: tempLat, lng: tempLng};

      markUsers(tempLatLng, tempName);
    }
  }
}

function drawDirections(pointA, pointB, name) {

  // directionsDisplay.setMap(map);

  let start = pointA;
  let end = pointB;
  let mem = name;

  let request = {
    origin: pointA,
    destination: pointB,
    travelMode: 'DRIVING'
  };

  directions.route(request, function(response, status) {
    if ( status == google.maps.DirectionsStatus.OK ) {
      renderer.setDirections(response);
      // renderer.setMap(map);
      renderDirections(response, pointA, pointB, name);
    } else {
      console.log('Could not render!')
    }
  })
}

function clearRoutes() {
  for ( let i = 0; i < routes.length; i++ ) {
    routes[i].setMap(null);
  }
}

// Calculating lat/long starting and end point for drawing of Polylines
function showRoutes() {
    for (let i = 0; i < document.getElementsByClassName('lats').length; i++) {
    if (document.getElementsByClassName('lats')[i].textContent != "") {
      let pointA = {lat: parseFloat(document.getElementsByClassName("lats")[i].textContent), lng: parseFloat(document.getElementsByClassName("lons")[i].textContent)};
      let pointB = { lat: midMarker.position.lat(), lng: midMarker.position.lng() };
      let name = document.getElementsByClassName("allNames")[i].textContent;
      drawDirections(pointA, pointB, name);
    }
  }
}

// Polyline color + sizing options
var polylineOptions = {
  strokeColor: '#C83939',
  strokeOpacity: 1,
  strokeWeight: 4
};

// Drawing the Polylines
function renderDirections(response, pointA, pointB, name) {
  let legs = response.routes[0].legs;
  for ( let i = 0; i < legs.length; i++ ) {
    let steps = legs[i].steps;

    for ( let j = 0; j < steps.length; j++ ) {
      let nextSegment = steps[j].path;
      let stepPolyline = new google.maps.Polyline(polylineOptions);
      for ( let k = 0; k < nextSegment.length; k++ ) {
        stepPolyline.getPath().push(nextSegment[k]);
      }
      routes.push(stepPolyline);
      stepPolyline.setMap(map);
      map.setZoom(14);
      map.panTo(midMarker.position);
      google.maps.event.addListener(stepPolyline, 'click', function(evt) {
        let request = {
          origins: [pointA],
          destinations: [pointB],
          travelMode: 'DRIVING'
        }

        let service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(request, function(response, status) {
          if ( status == 'OK' ) {
            infowindows.setContent(`${name}: Distance: ${response.rows[0].elements[0].distance.text} \n Travel time: ${response.rows[0].elements[0].duration.text}`)
            infowindows.setPosition(evt.latLng);
            infowindows.open(map);
          } else {
            console.log('could not get distance')
          }
        })
      })
    }
  }
}

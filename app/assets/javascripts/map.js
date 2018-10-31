console.log('linked!')

mark = [];

// Initiates a map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 1.35721, lng: 103.8198}
  });

  initAutocomplete();

  $("#place").click(place);
  document.getElementById("calc").addEventListener("click", markMid)
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
      var address = document.getElementById("person");
      document.getElementById("confirm").style.display = "table";

      // Inputting values into hidden field
      document.getElementById("lat").value = lat;
      document.getElementById("lon").value = lng;
      document.getElementById("address").value = address;
    });
}

function place() {
  let myLatLng = {lat: parseFloat($("#lat").val()), lng: parseFloat($("#lon").val())};

  // To avoid placing more than 1 marker
  if ( mark[0] != undefined ) {
    mark[0].setMap(null);
  }

  mark = [];
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
    mark.push(marker)
}

// Function to get all hidden values of lats + longs
function getAll() {

    let totalLat = 0;
    let totalLon = 0;

    for ( let i = 0; i < document.getElementsByClassName('lats').length; i++ ) {
        if ( document.getElementsByClassName('lats')[i].textContent != null ) {
            totalLat = totalLat + parseFloat(document.getElementsByClassName('lats')[i].textContent);
        }
    }

    for ( let i = 0; i < document.getElementsByClassName('lons').length; i++ ) {
        if ( document.getElementsByClassName('lats')[i].textContent != null ) {
            totalLon = totalLon + parseFloat(document.getElementsByClassName('lons')[i].textContent);
        }
    }

    let aveLat = totalLat / parseFloat(document.getElementsByClassName('lats').length);

    let aveLon = totalLon / parseFloat(document.getElementsByClassName('lons').length);

    midPoint = {lat: parseFloat(aveLat), lng: parseFloat(aveLon)};
}

function clearMarkers() {
    for ( let i = 0; i < mark.length; i++) {
        mark[i].setMap(null);
    }
}

function markMid() {

    getAll();

    midMarker = new google.maps.Marker({
        position: midPoint,
        map: map,
        draggable: true,
        label: 'Mid'
    })

    findPlaces();

    // For reference only can remove later
    $("#dragLat").html(midMarker.position.lat())
    $("#dragLong").html(midMarker.position.lng())

    google.maps.event.addListener(midMarker, 'dragend', function(evt) {
        $("#dragLat").html(midMarker.position.lat())
        $("#dragLong").html(midMarker.position.lng())
    })

    // Drag to search feature
    google.maps.event.addListener(midMarker, 'dragend', function(evt) {
        clearList();
        findPlaces();
    })
}

function createMarker(place) {

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    })

    mark.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    })
}

function findPlaces() {
    clearMarkers();

    placesArr = []

    var request = {
        location: {lat: midMarker.position.lat(), lng: midMarker.position.lng()},
        radius: 2000,
        type: $("#input").val(),
        openNow: true
    };

    // Info pop up window
    infoWindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if ( status == google.maps.places.PlacesServiceStatus.OK ) {
        results.forEach((result) => {
            placesArr.push(result);
        })
    }
    // Making marker for each place
    var len = placesArr.length;
    if ( len > 0 ) {
        const LIST = $("#listBoard");
        $("#listBoard").show()
        const DETS = $("#listText");

        for ( let i = 0; i < 10; i++ ) {
            places = placesArr[i]
            createMarker(places);

            // Name
            let placeName = places.name

            // Photo URL skip if place doesnt have photo
            if ( places.photos[0] == undefined ) {
                let photo = "no-image.png"
            } else {

                // Photo URL
                let photo = places.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})

                // Rating (out of 5)
                let rating = places.rating

                // Address
                let address = places.vicinity

                // Creating the list (to be styled later)
                doc = document.createElement("div");

                doc.innerHTML = `<div class="listText placeName">
                    <ul>${placeName}
                <div class="rating"><li>${rating}</li></div>
                <div class="address"><li>${address}</li></div>
                <div class="photo"><li>Photo<img src=${photo}/></li>
                </div>
                    </ul>
                </div>`;

                $("#listBoard").append(doc);

            }
        }
    }
}

function clearList() {
    let clear = document.getElementById("listBoard");
    while ( clear.firstChild ) {
        clear.removeChild(clear.firstChild)
    }
}

















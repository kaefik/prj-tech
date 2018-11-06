var Map = null;
var CenterLat = 55.80051;
var CenterLon = 49.15009;
var Planes = {};
var NumPlanes = 0;
var Selected = null;

console.log("script_old");

function getIconForPlane(plane) {
  var r = 255,
    g = 255,
    b = 0;
  var maxalt = 40000; /* Max altitude in the average case */
  var invalt = maxalt - plane.altitude;
  var selected = Selected == plane.hex;

  if (invalt < 0) invalt = 0;
  b = parseInt((255 / maxalt) * invalt);
  return {
    strokeWeight: selected ? 2 : 1,
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 5,
    fillColor: "rgb(" + r + "," + g + "," + b + ")",
    fillOpacity: 0.9,
    rotation: plane.track
  };
}
/*
function selectPlane() {
  if (!Planes[this.planehex]) return;
  var old = Selected;
  Selected = this.planehex;
  if (Planes[old]) {
    
    Planes[old].marker.setIcon(getIconForPlane(Planes[old]));
  }
  Planes[Selected].marker.setIcon(getIconForPlane(Planes[Selected]));
  refreshSelectedInfo();
}
*/

function pan(ev){
  console.log("click pan");
  console.log("ev = ", ev);
  console.log("Planes = ", Planes);

  console.log("this.planehex = ", this);

  if (!Planes[this.planehex]) return;
  var old = Selected;
  Selected = this.planehex;
  if (Planes[old]) {
    /* Remove the highlight in the previously selected plane. */
   // Planes[old].marker.setIcon(getIconForPlane(Planes[old]));
  }
  //Planes[Selected].marker.setIcon(getIconForPlane(Planes[Selected]));
  refreshSelectedInfo();
}

function refreshGeneralInfo() {
  var i = document.getElementById("geninfo");

  i.innerHTML = NumPlanes + " planes on screen.";
}

function refreshSelectedInfo() {
  console.log("refreshSelectedInfo()")
  var i = document.getElementById("selinfo");
  var p = Planes[Selected];
  console.log("p = ", p);

  if (!p) return;
  var html = "ICAO: " + p.hex + "<br>";
  if (p.flight.length) {
    html += "<b>" + p.flight + "</b><br>";
  }
  html += "Altitude: " + p.altitude + " feet<br>";
  html += "Speed: " + p.speed + " knots<br>";
  html += "Coordinates: " + p.lat + ", " + p.lon + "<br>";
  i.innerHTML = html;
}

function fetchData() {
  //console.log("fetch");
  $.getJSON("http://localhost:8080/data.json", function(data) {
    //console.log("data = ", data);
    var stillhere = {};
    for (var j = 0; j < data.length; j++) {
      var plane = data[j];
      var marker = null;
      stillhere[plane.hex] = true;
      plane.flight = $.trim(plane.flight);

      if (Planes[plane.hex]) {
        var myplane = Planes[plane.hex];
        if (myplane.lat != plane.lat && myplane.lon != plane.lon) {
          console.log(
            myplane.flight,
            " old pos = ",
            [myplane.lat, myplane.lon],
            " new pos = ",
            [plane.lat, plane.lon]
          );
          Planes[plane.hex].marker.removeFrom(Map);
          Planes[plane.hex].marker = new L.marker([plane.lat, plane.lon]);
          Planes[plane.hex].altitude = plane.altitude;
          Planes[plane.hex].speed = plane.speed;
          Planes[plane.hex].lat = plane.lat;
          Planes[plane.hex].lon = plane.lon;
          Planes[plane.hex].track = plane.track;
          Planes[plane.hex].flight = plane.flight;
          L.DomEvent.addListener(Planes[plane.hex].marker, 'click', pan);
          if (Planes[plane.hex].hex == Selected) refreshSelectedInfo();
          
          if (plane.flight.length == 0) {
            Planes[plane.hex].marker.bindPopup(plane.hex);
          } else {
            Planes[plane.hex].marker.bindPopup(plane.flight + " (" + plane.hex + ")");
          }
          Planes[plane.hex].marker.addTo(Map);
        } 
        
        
      } else {
        plane.marker = new L.marker([plane.lat, plane.lon]);
        //plane.planehex = plane.hex;
        Planes[plane.hex] = plane;
        Planes[plane.hex].marker.addTo(Map);

        L.DomEvent.addListener(Planes[plane.hex].marker, 'click', pan);
        
        if (plane.flight.length == 0) {
          //marker.setTitle(plane.hex);
          plane.marker.bindPopup(plane.hex);
        } else {
          //marker.setTitle(plane.flight + " (" + plane.hex + ")");
          plane.marker.bindPopup(plane.flight + " (" + plane.hex + ")");
        }
      }
    }
    NumPlanes = data.length;

    /* Remove idle planes. */
    for (var p in Planes) {
      if (!stillhere[p]) {
        //Planes[p].marker.setMap(null);
        Planes[p].marker.removeFrom(Map);
        delete Planes[p];
      }
    }
  });
}

function initialize() {
  console.log("initialize");
  //Определяем карту, координаты центра и начальный масштаб
  Map = L.map("map_canvas").setView([CenterLat, CenterLon], 6);

  //Добавляем на нашу карту слой OpenStreetMap
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(Map);

  /* Setup our timer to poll from the server. */

  window.setInterval(function() {
    fetchData();
    refreshGeneralInfo();
  }, 1000);
}

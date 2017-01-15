var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    var options={
      enableHightAccuracy: true,
      timeout: 5000,
      maximumAge: 3000
    };
    //navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion, options);
    var watchId = navigator.geolocation.watchPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion, options);
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);
    // pintamos posición actual.
    app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);
    // pintamos circulo de radio.
    app.pintaCircle([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
      app.pintaMarcador2(evento.latlng, texto, miMapa);
    });


  },
  // Marcadores azules por defecto
  pintaMarcador2: function(latlng, texto, mapa){

      var marcador = L.marker(latlng).addTo(mapa);
      marcador.bindPopup(texto).openPopup();    

        
  },

  // Marcador inicial
  pintaMarcador: function(latlng, texto, mapa){
    // Se crea el icono de posición incial
    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var marcador = L.marker(latlng, {icon: greenIcon}).addTo(mapa);
    marcador.bindPopup(texto).openPopup();    
       
  },

  pintaCircle: function(latlng, texto, mapa) {
    var circle = L.circle(latlng, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.0,
      radius: 500
    }).addTo(mapa);
  },
  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
  }

};

var watchId;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);
}
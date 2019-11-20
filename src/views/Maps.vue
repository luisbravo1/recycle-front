<template>
  <div class="google-map" :id="mapName">
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Nombre</v-card-title>
        <v-card-text>
          <v-layout row wrap pa-3>
            <div><b>Tipo de Reciclaje:</b></div>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="blue" @click="getDirections(0)">Get Directions</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn absolute fab right >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      clear: true,
      dialog: false,
      mapName: this.name + "-map",
      markerCoordinates: [
        {
        latitude: 25.654441,
        longitude: -100.287157,
        title: "<h3>Centro de Reciclaje TEC</h3><br><span><b>Tipo de Reciclaje:</b> Cárton y Papel</span><br><span><b>Horarios:</b> 9:00 am - 6:00 pm</span><br><span><b>Dirección:</b> Sin Nombre de Colonia 34, Tecnológico, 64849 Monterrey, Nuevo Leon</span>"
        },
        {
          latitude: 25.654830,
          longitude: -100.304573,
          title: "<h3>Reciclados GR</h3><br><span><b>Tipo de Reciclaje:</b> Metales</span><br><span><b>Horarios:</b> 10:00 am - 5:00 pm</span><br><span><b>Dirección:</b> Sinaloa #1400, Nuevo Repueblo, 64720 Monterrey, N.L.</span>"
        },
        {
          latitude: 25.665165,
          longitude: -100.296542,
          title: "<h3>E.W. basura electrónica</h3><br><span><b>Tipo de Reciclaje:</b> Electrónica</span><br><span><b>Horarios:</b> 9:00 am - 6:00 pm</span><br><span><b>Dirección:</b> 2a. Zona 239, Caracol, 64810 Monterrey, N.L.</span>"
        }
      ],
      map: null,
      directionsService: null,
      directionsRenderer: null,
      bounds: null,
      markers: [],
      pos: null
    }
  },
  methods: {
    getDirections (index) {
      this.dialog = false
      var start = { lat: this.pos.lat, lng: this.pos.lng };
      var end = { lat: this.markerCoordinates[index].latitude, lng: this.markerCoordinates[index].longitude };

      var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      };

      this.directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          this.directionsRenderer.setDirections(result);
          this.showSteps(result)
        }
      });
    },
    showSteps(directionResult) {
      // For each step, place a marker, and add the text to the marker's
      // info window. Also attach the marker to an array so we
      // can keep track of it and remove it when calculating new
      // routes.
      var myRoute = directionResult.routes[0].legs[0];
      var markerArray = []

      for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = new google.maps.Marker({
            position: myRoute.steps[i].start_point,
            map: this.map
          });
          this.attachInstructionText(marker, myRoute.steps[i].instructions);
          markerArray[i] = marker;
      }
    },
    attachInstructionText(marker, text) {
      var stepDisplay = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(this.map, marker);
      })
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();

    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]

    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }

    this.map = new google.maps.Map(element, options)
    this.directionsService = new google.maps.DirectionsService()
    this.directionsRenderer = new google.maps.DirectionsRenderer()

    this.directionsRenderer.setMap(this.map);

    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude)
      const marker = new google.maps.Marker({ 
        position,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: coord.title
      })
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    })

    var vm = this
    this.markers.forEach((marker) => {
      google.maps.event.addListener(marker, 'click', function() {
        // infowindow.setContent(marker.title + '<a class=\"btn btn-danger\" @click.native=\"this.getDirections()\">directions</a>')
        vm.dialog = true
        // infowindow.open(this.map, marker)
      })
    })
  },
  created () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, error => {
        console.log(error)
      });
    } else {
      console.log('Browser doesnt support Geolocation')
    }
  }
};
</script>
<style scoped>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: gray;
}
</style>
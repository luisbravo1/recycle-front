<template>
  <div class="wrapper">
    <div class="google-map" :id="mapName">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>{{ selectedPlace.name }}</v-card-title>
          <v-card-text>
            <v-layout row wrap px-3>
              <v-flex xs12>
                <div><b>Tipo de Reciclaje:</b> {{ selectedPlace.type }}</div>
              </v-flex>
              <v-flex xs12>
                <div><b>Horario:</b> {{ selectedPlace.startTime }} - {{selectedPlace.endTime}}</div>
              </v-flex>
              <v-flex xs12>
                <div><b>Dirección:</b> {{ selectedPlace.address }}</div>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="pb-6 pr-8">
            <v-spacer></v-spacer>
            <v-btn dark color="blue" @click="getDirections(selectedPlace.index)">Get Directions</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="over-map">
      <!-- TODO: Mobile Friendly -->
      <v-layout>
          <v-checkbox v-model="filters" label="Plastico" value="Plastico" class="pr-8"></v-checkbox>
          <v-checkbox v-model="filters" label="Papel" value="Papel" class="pr-8"></v-checkbox>
          <v-checkbox v-model="filters" label="Vidrio" value="Vidrio" class="pr-8"></v-checkbox>
          <v-checkbox v-model="filters" label="Metal" value="Metal" class="pr-8"></v-checkbox>
          <v-checkbox v-model="filters" label="Electronicos" value="Electronicos" class="pr-8"></v-checkbox>
          <v-checkbox v-model="filters" label="Pilas" value="Pilas" class="pr-8"></v-checkbox>
        <div class="pt-3">
          <v-btn color="info" @click="filterPlaces()">Apply</v-btn>
        </div>
      </v-layout>
    </div>
    <v-dialog v-model="errorDialog" max-width="300" max-height="300" persistent>
      <v-card>
        <v-card-text class="justify-center">
          <div class="text-center pt-4">
            <img width="100" height="100" src="../assets/error.png"><br><br>
            <span>No hay lugares que coincidan con tus filtros</span>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn dark color="error" @click="reset()">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      errorDialog: false,
      mapName: this.name + '-map',
      places: [],
      filteredPlaces: [],
      selectedPlace: {},
      filters: [],
      map: null,
      directionsService: null,
      directionsRenderer: null,
      bounds: null,
      markers: [],
      pos: null
    }
  },
  computed: {
  },
  methods: {
    getPlaces () {
      this.$http.get('places/').then(response => {
        this.places = response.data
        this.filteredPlaces = this.places
        // console.log(this.places)
        this.drawMap()
      }, response => {
      })
    },
    filterPlaces () {
      if (!this.filters.length)
        this.filteredPlaces = this.places
      else
        this.filteredPlaces = this.places.filter(place => this.filters.includes(place.type))

      if (!this.filteredPlaces.length)
        this.errorDialog = true
      else 
        this.drawMap()
    },
    reset () {
      this.filteredPlaces = this.places
      this.filters = []
      this.drawMap()
      this.errorDialog = false
    },
    openInfoDialog (selectedMarker) {
      this.selectedPlace = selectedMarker
      this.dialog = true
    },
    getDirections (index) {
      this.dialog = false
      var start = { lat: this.pos.lat, lng: this.pos.lng }
      var end = { lat: this.filteredPlaces[index].location[0].latitude, lng: this.filteredPlaces[index].location[0].longitude }

      var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }

      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result)
          this.showSteps(result)
        }
      })
    },
    showSteps (directionResult) {
      // For each step, place a marker, and add the text to the marker's
      // info window. Also attach the marker to an array so we
      // can keep track of it and remove it when calculating new
      // routes.
      var myRoute = directionResult.routes[0].legs[0]
      var markerArray = []

      for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new google.maps.Marker({
          position: myRoute.steps[i].start_point,
          map: this.map
        })
        this.attachInstructionText(marker, myRoute.steps[i].instructions)
        markerArray[i] = marker
      }
    },
    attachInstructionText (marker, text) {
      var stepDisplay = new google.maps.InfoWindow()
      google.maps.event.addListener(marker, 'click', function () {
        stepDisplay.setContent(text)
        stepDisplay.open(this.map, marker)
      })
    },
    drawMap () {
      this.bounds = new google.maps.LatLngBounds()

      const element = document.getElementById(this.mapName)
      const mapCentre = this.filteredPlaces[0].location[0]

      const options = {
        center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
      }

      this.map = new google.maps.Map(element, options)
      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer()

      this.directionsRenderer.setMap(this.map)

      this.filteredPlaces.forEach((coord, index) => {
        const position = new google.maps.LatLng(coord.location[0].latitude, coord.location[0].longitude)
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          animation: google.maps.Animation.DROP,
          name: coord.name,
          type: coord.type,
          address: coord.address,
          startTime: coord.startTime,
          endTime: coord.endTime,
          index: index
        })
        this.markers.push(marker)
        this.map.fitBounds(this.bounds.extend(position))
      })

      var vm = this
      this.markers.forEach((marker) => {
        google.maps.event.addListener(marker, 'click', function () {
          vm.openInfoDialog(marker)
        })
      })
    }
  },
  created () {
    this.getPlaces()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, error => {
        console.log(error)
      })
    } else {
      console.log('Browser doesnt support Geolocation')
    }
  }
}
</script>
<style scoped>
.google-map {
  width: 100%;
  height: 92%;
  margin: 0 auto;
  background: gray;
  position: absolute;
  top: 8%;
}

.over-map {
  position: absolute;
  top: -5px;
  left: 10px;
  z-index: 99;
}
</style>

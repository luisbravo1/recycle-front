<template>
  <v-container fluid>
    <v-layout row wrap class="justify-center">
      <v-flex xs12 md8>
        <v-card outlined>
          <v-flex xs12 pa-4 pl-8 style="background-color: #00979c;">
            <h1 style="color: white;">Add a new Place</h1>
          </v-flex>
          <v-divider></v-divider>
          <v-form
            ref="formPlace"
            v-model="validPlace"
            lazy-validation
            class="pa-8"
          >
            <v-text-field
              v-model="place.name"
              label="Name"
              required
              outlined
            ></v-text-field>

            <v-select
              v-model="place.type"
              :items="types"
              label="Type of recycle"
              required
              outlined
            ></v-select>

            <v-text-field
              v-model="place.address"
              label="Direction"
              required
              outlined
              @change="getCoordinates()"
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs6 pl-4 pr-2>
                <v-text-field
                  v-model="place.startTime"
                  label="Opening Hours"
                  type="time"
                  required
                  outlined
                ></v-text-field>
              </v-flex>

              <v-flex xs6 pl-2 pr-4>
                <v-text-field
                  v-model="place.endTime"
                  label="Closing hours"
                  type="time"
                  required
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-text-field
              v-model="place.location.latitude"
              label="Latitude"
              type="number"
              disabled
              outlined
              prepend-icon="mdi-map"
            ></v-text-field>

            <v-text-field
              v-model="place.location.longitude"
              label="Longitude"
              type="number"
              disabled
              outlined
              prepend-icon="mdi-map"
            ></v-text-field>

            <div class="text-center">
              <v-btn
                color="error"
                class="mr-4"
                @click="reset"
              >
                Clear
              </v-btn>

              <v-btn
                :disabled="!validPlace"
                color="success"
                class="mr-4"
                @click="postPlace()"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="300" max-height="300" persistent>
      <v-card>
        <v-card-text class="justify-center">
          <div class="text-center">
            <img v-bind:v-if="error" width="100" height="125" src="../assets/error.png"><br>
            <img v-bind:v-if="!error" width="100" height="125" src="../assets/success.png"><br>
            <span>{{ dialogMessage }}</span>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn dark color="green" @click="reset()">Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
var moment = require('moment')
const creds = require('../utils/creds.json')
const API_KEY = creds.gmaps_key

export default {
  data: () => ({
    error: false,
    dialog: false,
    dialogMessage: 'Success',
    validPlace: false,
    time: '',
    menu2: false,
    modal2: false,
    place: {
      name: '',
      type: '',
      startTime: '',
      endTime: '',
      address: '',
      location: {
        latitude: null,
        longitude: null
      }
    },
    types: ['Plastico', 'Papel', 'Vidrio', 'Metal', 'Electronicos', 'Pilas']
  }),
  components: {
  },
  methods: {
    postPlace () {
      console.log(this.place)
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.post('places/', this.place, options).then(response => {
        this.dialogMessage = 'Success posting place'
        this.dialog = true
      }, response => {
        this.dialogMessage = 'Error posting place'
        this.error = true
        this.dialog = true
      })
    },
    getCoordinates () {
      const link = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.place.address + `&key=${API_KEY}`
      this.$http.get(link).then(response => {
        const results = response.body.results

        if (results.length === 0) {
          console.log('error')
        } else {
          const coordinates = results[0].geometry.location
          console.log(coordinates)
          this.place.location.longitude = coordinates.lng
          this.place.location.latitude = coordinates.lat
        }
      }, error => {
        console.log(error)
      })
    },
    reset () {
      this.dialog = false
      this.error = false

      this.place.name = ''
      this.place.country = ''
      this.place.state = ''
      this.place.city = ''
      this.place.zipcode = ''
      this.place.location.latitude = null
      this.place.location.longitude = null
    }
  },
  created () {
  }
}
</script>

<style>

</style>

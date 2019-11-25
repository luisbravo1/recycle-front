<template>
  <v-container fluid>
    <v-layout row wrap class="justify-center">
      <v-flex v-if="user" xs12 md8>
        <v-card outlined>
          <v-flex xs12 pa-4 pl-8 style="background-color: #00979c;">
            <h1 style="color: white;">Request Pick Up</h1>
          </v-flex>
          <v-divider></v-divider>
          <v-form
            ref="formPlace"
            v-model="validPickup"
            lazy-validation
            class="pa-8"
          >
            <v-select
              v-model="pickup.types"
              :items="types"
              label="Type of recycle"
              deletable-chips
              attach
              chips
              multiple
              required
              outlined
            ></v-select>

            <v-text-field
              v-model="pickup.kilograms"
              label="Kilograms"
              type="number"
              required
              outlined
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs6 pl-4 pr-2>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="pickup.date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="pickup.date"
                      label="Pick Up Date"
                      prepend-icon="event"
                      outlined
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="pickup.date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(pickup.date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs6 pl-4 pr-2>
                <v-text-field
                  v-model="pickup.time"
                  label="Pick Up Time"
                  type="time"
                  required
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-text-field
              v-model="pickup.address"
              label="Address"
              :loading="loadingAddress"
              required
              outlined
              @change="getCoordinates()"
            ></v-text-field>

            <v-text-field
              v-model="pickup.location.latitude"
              label="Latitude"
              type="number"
              :loading="loadingCoordinates"
              disabled
              outlined
              prepend-icon="mdi-map"
            ></v-text-field>

            <v-text-field
              v-model="pickup.location.longitude"
              label="Longitude"
              type="number"
              :loading="loadingCoordinates"
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
                :disabled="!validPickup"
                color="success"
                class="mr-4"
                @click="postPickup()"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>
      <!-- Login -->
      <v-flex v-if="!user" xs12 md8>
        <v-card>
          <Login></Login>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="300" max-height="300" persistent>
      <v-card>
        <v-card-text class="justify-center">
          <div class="text-center">
            <img v-if="error" width="100" height="125" src="../assets/error.png"><br>
            <img v-if="!error" width="100" height="125" src="../assets/success.png"><br>
            <span>{{ dialogMessage }}</span>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn dark color="green" @click="reset()">Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <notifications group="pickup" position="bottom right"/>

  </v-container>
</template>
<script>
var moment = require('moment')
const creds = require('../utils/creds.json')
const API_KEY = creds.gmaps_key
import Login from './Login.vue'

export default {
  data: () => ({
    loadingAddress: false,
    loadingCoordinates: false,
    modal: false,
    error: false,
    dialog: false,
    dialogMessage: 'Success',
    validPickup: false,
    user: null,
    pickup: {
      types: [],
      date: new Date().toISOString().substr(0, 10),
      time: null,
      address: '',
      location: {
        latitude: null,
        longitude: null
      }
    },
    types: ['Plastico', 'Papel', 'Vidrio', 'Metal', 'Electronicos', 'Pilas']
  }),
  components: {
    Login
  },
  methods: {
    postPickup () {
      console.log(this.pickup)
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.post('pickups/', this.pickup, options).then(response => {
        this.$notify({
          group: 'pickup',
          title: 'Pick Up Scheduled',
          text: 'Your pickup has been scheduled for ' + `<b>${moment(this.pickup.date).format('LL')} at ${this.pickup.time}</b>`,
          duration: -1
        })
      }, response => {
        this.$notify({
          group: 'pickup',
          title: 'ERROR',
          type: 'error',
          text: 'There has been an error scheduling your pick up',
          duration: -1
        })
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
        this.loadingCoordinates = false
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
    },
    getMe () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/me', options).then(response => {
        window.localStorage.setItem('user', JSON.stringify(response.data))
        this.user = JSON.parse(window.localStorage.user)
        // console.log('user getMe', this.user)
      }, response => {
      })
    }
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
      // console.log('user LocalStorage', this.user)
    } else {
      this.getMe()
    }
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.pickup.location = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude
    //     }
    //     this.loadingCoordinates = false
    //     const link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + `&key=${API_KEY}`
    //     this.$http.get(link).then(response => {
    //       this.pickup.address = response.body.results[0].formatted_address
    //       this.loadingAddress = false
    //     }, error => {
    //       console.log(error)
    //       this.loadingAddress = false
    //       this.loadingCoordinates = false
    //     })
    //   }, error => {
    //     this.loadingAddress = false
    //     this.loadingCoordinates = false
    //     console.log(error)
    //   })
    // } else {
    //   this.loadingAddress = false
    //   this.loadingCoordinates = false
    //   console.log('Browser doesnt support Geolocation')
    // }
    // console.log(this.pickup)
  }
}
</script>

<style>

</style>

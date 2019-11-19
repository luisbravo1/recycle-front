<template>
  <v-container fluid>
    <v-layout row wrap class="justify-center">
      <v-flex xs8>
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

            <v-text-field
              v-model="place.type"
              label="Type of recycle"
              hint="Electronic, Paper, Plastic"
              required
              outlined
            ></v-text-field>

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
                  label="Start Time"
                  type="time"
                  required
                  outlined
                ></v-text-field>
              </v-flex>

              <v-flex xs6 pl-2 pr-4>
                <v-text-field
                  v-model="place.endTime"
                  label="End Time"
                  type="time"
                  required
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>
 
            <v-text-field
              v-model="place.location.lat"
              label="Latitude"
              type="number"
              disabled
              outlined
              prepend-icon="mdi-map"
            ></v-text-field>

            <v-text-field
              v-model="place.location.long"
              label="Longitude"
              type="number"
              disabled
              outlined
              prepend-icon="mdi-map"
            ></v-text-field>

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
              @click="submit()"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="300" max-height="300" persistent>
    <v-card>
      <v-card-text class="justify-center">
        <div class="text-center">
          <img width="100" height="125" src="../assets/success.png"><br>
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
      endtime: '',
      address: '',
      location: {
        lat: null,
        long: null
      }
    }
  }),
  components: {
    // MsgDialog
  },
  methods: {
    getEvents () {
      this.$http.get('events/').then(response => {
        this.events = response.data
        // console.log('events', this.events)
      }, response => {
      })
    },
    getPlaces () {
      this.$http.get('places/').then(response => {
        this.places = response.data
        // console.log('places', this.places)
      }, response => {
      })
    },
    getCoordinates () {
      const link = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.place.address + `&key=${API_KEY}`
      this.$http.get(link).then(response => {
        const results = response.body.results

        if (results.length == 0) {
          console.log('error')
        } else {
          const coordinates = results[0].geometry.location
          console.log(coordinates)
          this.place.location.long = coordinates.lng
          this.place.location.lat = coordinates.lat
        }
      }, error => {
        console.log(error)
      })
    },
    reset () {
      this.dialog = false

      this.place.name = ''
      this.place.country = ''
      this.place.state = ''
      this.place.city = ''
      this.place.zipcode = ''
      this.place.location.lat = null
      this.place.location.long = null
    },
    submit () {
      var body = {}
      var entity = ''

      switch (this.tab) {
        case 0:
          body = this.event
          body.startDate = moment(body.startDate).unix() * 1000
          body.endDate = moment(body.endDate).unix() * 1000
          entity = 'events'
          break
        case 1:
          body = this.place
          entity = 'places'
          break
        case 2:
          body = this.zone
          entity = 'zones'
          break
        case 3:
          body = this.progEvent
          body.date = moment(body.date).unix() * 1000
          entity = 'programmedEvents'
          break
      }
      console.log(body, entity)

      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.post(entity, body, options).then(response => {
        this.dialog = true
        this.dialogMessage = 'Success posting ' + entity
      }, response => {
        this.dialog = true
        this.dialogMessage = 'Error posting ' + entity
      })
    }
  },
  created () {
  }
}
</script>

<style>

</style>

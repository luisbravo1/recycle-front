<template>
  <v-container fluid>
    <v-layout row wrap class="justify-center">
      <v-flex v-if="user" xs12 md8>
        <v-card outlined>
          <v-flex xs12 pa-4 pl-8 style="background-color: #00979c;">
            <h1 style="color: white;">Profile</h1>
          </v-flex>
          <v-divider></v-divider>
          <v-flex pa-4 pl-8>
            <h2>Hello {{ user.name }}, so far you have recycled {{ kilograms }}kg</h2>
          </v-flex>
          <v-flex px-4>
            <apexchart width="100%" type="bar" :options="options" :series="series"></apexchart>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- <v-dialog v-model="dialog" max-width="300" max-height="300" persistent>
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
    </v-dialog> -->
  </v-container>
</template>
<script>

export default {
  data: () => ({
    user: null,
    kilograms: 10,
    types: ['Plastico', 'Papel', 'Vidrio', 'Metal', 'Electronicos', 'Pilas'],
    options: {
      chart: {
        id: 'vuechart-data',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      xaxis: {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
          '01/05/2011 GMT', '01/06/2011 GMT'
        ],
      }
    },
    series: [{
      name: 'Electronicos',
      data: [44, 55, 41, 67, 22, 43]
    }, {
      name: 'Papel',
      data: [13, 23, 20, 8, 13, 27]
    }, {
      name: 'Metal',
      data: [11, 17, 15, 15, 21, 14]
    }, {
      name: 'Vidrio',
      data: [21, 7, 25, 13, 22, 8]
    }]
  }),
  components: {
  },
  methods: {
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
  }
}
</script>

<style>

</style>

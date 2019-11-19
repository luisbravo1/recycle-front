<template>
  <v-app>
    <v-app-bar
      app
      flat
      hide-on-scroll
      :style="[['home'].indexOf($route.name) ? {'background-color' : '#00979c'} : {}]"
    >
      <v-toolbar-title class="px-8">
        <v-btn
          text
          class="headline"
          :color="['home'].indexOf($route.name) ? 'white' : '#00979c'"
          style="text-transform: none !important;"
          @click="$router.push('/')"
        ><b>Go</b>RECYCLE</v-btn>
      </v-toolbar-title>

      <!-- <v-toolbar-title class="headline text-uppercase">
        <span>Go</span>
        <span class="font-weight-light">Recycle</span>
      </v-toolbar-title> -->
      <v-toolbar-items
        v-for="section in sections"
        :key="section.text"
      >
        <v-btn
          text
          :dark="['home'].indexOf($route.name) <= -1"
          @click="goto(section.to)"
        >{{ section.text }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- Login / Sign Up -->
      <v-btn
        v-if="user === null"
        text
        :dark="['home'].indexOf($route.name) <= -1"
        @click="goLogin"
      >Sign In</v-btn>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon :dark="['home'].indexOf($route.name) <= -1" v-on="on">
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">Log Out</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <!-- Login -->
    <v-dialog v-model="loginDialog" max-width="500px">
      <v-card v-if="loginDialog">
        <Login></Login>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Login from './views/Login.vue'

export default {
  name: 'App',
  data: () => ({
    isSending: true,
    user: null,
    loginDialog: false,
    sections: [
      {
        to: '/maps',
        text: 'Maps'
      },
      {
        to: '/addPlace',
        text: 'Add'
      },
      {
        to: '/',
        text: 'Info'
      },
      {
        to: '/',
        text: 'Contact'
      }
    ]
  }),
  components: {
    Login
  },
  methods: {
    goto (link) {
      this.$router.push(link)
    },
    goLogin () {
      this.loginDialog = true
    },
    logout () {
      localStorage.clear()
      this.$cookies.remove('authToken')
      this.$router.push('/')
      this.$router.go(0)
    },
    getMe () {
      this.isSending = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/me', options).then(response => {
        this.user = response.data
        this.isSending = false
      }, response => {
        this.isSending = false
      })
    }
  },
  created () {
    if (this.$cookies.isKey('authToken')) {
      this.getMe()
    }
  }
}
</script>

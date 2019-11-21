<template>
  <v-app>
    <div v-if="windowSize < 2">
      <v-app-bar
        app
        flat
        hide-on-scroll
        style="background-color: #00979c;"
      >
        <v-toolbar-title>
          <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-btn
            text
            class="headline"
            color="white"
            style="text-transform: none !important;"
            @click="$router.push('/')"
          ><b>Go</b>RECYCLE</v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Login / Sign Up -->
        <v-btn
          v-if="user === null"
          text
          dark
          @click="goLogin"
        >Sign In</v-btn>
        <v-menu v-else offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon>person</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">Log Out</v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        dark
        color="#00979c"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                text
                class="headline"
                color="white"
                style="text-transform: none !important;"
                @click="$router.push('/')"
              ><b>Go</b>RECYCLE</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in sections"
            :key="item.text"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <div v-else>
      <v-app-bar
        app
        flat
        hide-on-scroll
        style="background-color: #00979c;"
      >
        <v-toolbar-title class="px-8">
          <v-btn
            text
            class="headline"
            color="white"
            style="text-transform: none !important;"
            @click="$router.push('/')"
          ><b>Go</b>RECYCLE</v-btn>
        </v-toolbar-title>
        <v-toolbar-items
          v-for="section in sections"
          :key="section.text"
        >
          <v-btn
            text
            dark
            @click="goto(section.to)"
          >{{ section.text }}
          </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <!-- Login / Sign Up -->
        <v-btn
          v-if="user === null"
          text
          dark
          @click="goLogin"
        >Sign In</v-btn>
        <v-menu v-else offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon>person</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">Log Out</v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

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
    drawer: false,
    isSending: true,
    user: null,
    loginDialog: false,
    sections: [
      {
        to: '/maps',
        text: 'Maps',
        icon: 'mdi-map'
      },
      {
        to: '/addPlace',
        text: 'Add',
        icon: 'add_box'
      },
      {
        to: '/info',
        text: 'Info',
        icon: 'info'
      },
      {
        to: '/contact',
        text: 'Contact',
        icon: 'local_phone'
      }
    ]
  }),
  components: {
    Login
  },
  computed: {
    windowSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 1
        case 'md': return 2
        case 'lg': return 3
        case 'xl': return 4
        default: return 0
      }
    }
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

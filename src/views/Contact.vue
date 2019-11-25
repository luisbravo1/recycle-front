<template>
  <v-container fluid>
    <v-layout row wrap class="justify-center">
      <v-flex xs12 md8>
        <v-card>
          <v-form
            lazy-validation
            class="pa-8"
          >
            <h1 class="nunito center">Get in touch</h1>
            <p>Escribenos si tienes dudas</p>
            <v-text-field
              v-model="suggestion.name"
              label="Name"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="suggestion.email"
              label="Email"
              type="email"
              hint="example@email.com"
              :rules="[rules.email]"
              required
              outlined
            ></v-text-field>

            <v-textarea
              v-model="suggestion.message"
              label="Message"
              counter
              required
              outlined
            ></v-textarea>

            <div class="text-center">
              <v-btn
                color="success"
                class="mr-4"
                @click="postMessage()"
              >
                Send
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
  </v-container>
</template>
<script>
export default {
  name: 'contact-form',
  data: function () {
    return {
      dialog: false,
      dialogMessage: '',
      error: false,
      suggestion: {
        name: '',
        email: '',
        message: ''
      },
      rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email'
      },
    }
  },
  methods: {
    postMessage () {
      this.$http.post('suggestions/', this.suggestion).then(response => {
        this.dialogMessage = 'Success posting suggestion'
        this.dialog = true
        this.error = false
      }, response => {
        this.dialogMessage = 'Error posting suggestion'
        this.error = true
        this.dialog = true
      })
    },
    reset () {
      this.dialog = false
      this.dialogMessage = ''
      this.error = false
      this.suggestion = {}
    }
  },
  created () {
    // console.log('created')
  }
}
</script>
<style scoped>
  .nunito {
    font-family: 'Nunito', sans-serif;
  }

  .center {
    text-align: center;
  }
</style>
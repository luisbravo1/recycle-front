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
              v-model="contact.name"
              label="Name"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="contact.email"
              label="Email"
              type="email"
              hint="example@email.com"
              :rules="[rules.email]"
              required
              outlined
            ></v-text-field>

            <v-textarea
              v-model="contact.message"
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
  </v-container>
</template>
<script>
export default {
  name: 'contact-form',
  data: function () {
    return {
      contact: {
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
    isValidName () {
      var valid = this.name.length > 0
      console.log('checking for a valid name: ' + valid)
      return valid
    },
    isValidEmail () {
      var valid = this.email.indexOf('@') > 0
      console.log('checking for a valid email: ' + valid)
      return valid
    },
    isValidMessage () {
      var valid = (this.message.length > 0) &&
          (this.message.length < this.maxLength)
      console.log('checking for a valid message: ' + valid)
      return valid
    },
    submitForm () {
      console.log('submit here')
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
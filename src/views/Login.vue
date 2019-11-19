<template>
  <div>
    <v-container v-if="isLoggingIn">
      <h1 class="text-xs-center pl-4">Sign In</h1>
      <v-layout>
        <v-flex xs12 pa-4>
          <v-form
            ref="form"
            v-model="loginValid"
          >
            <v-text-field
              v-model="user.email"
              :rules="[rules.email]"
              :disabled="isSending"
              label="Email Address"
              outlined
              required
              validate-on-blur
              @keyup.enter.native="login"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :type="show1 ? 'text' : 'password'"
              :disabled="isSending"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              outlined
              @click:append="show1 = !show1"
              label="Password"
              @keyup.enter.native="login"
            ></v-text-field>

            <center v-if=errorMessageStatus>
              <p style="color:red;">{{errorMessage}}</p>
            </center>

            <center>
              <v-progress-circular
                v-if="isSending"
                indeterminate
                color="#00979c"
              ></v-progress-circular>
              <v-btn
                v-else
                :disabled="!loginValid"
                color="#00979c"
                :dark="loginValid"
                @click="login"
              >
              Sign In
              </v-btn>
            </center>

            <center class="pt-4">
              <a @click="beginRegister">
                Create Account
              </a>
            </center>
            <center class="pt-4">
              <a @click="beginPasswordRecovery">
                Forgot your password?
              </a>
            </center>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="isRegistering">
      <h1 class="text-xs-center pl-4">Sign Up</h1>
      <v-layout>
        <v-flex xs12 pa-4>
          <v-form v-model="registerValid">
            <v-text-field
              v-model="newUser.email"
              :rules="[rules.email]"
              label="Email Address"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.name"
              :rules="[() => newUser.name.length >= 1 || 'Enter a valid name']"
              label="Name"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.password"
              type="password"
              hint="Al menos 8 caracteres"
              :rules="[() => newUser.password.length >= 8 || 'The password must be atleast 8 characters']"
              label="Password"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.confPassword"
              :type="show1 ? 'text' : 'password'"
              hint="Al menos 8 caracteres"
              :rules="[() => newUser.confPassword.length >= 8 && newUser.password === newUser.confPassword || 'Enter matching password']"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              @click:append="show1 = !show1"
              label="Confirm Password"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.phone"
              :rules="[() => newUser.phone.length >= 1 || 'Enter a valid phone number']"
              label="Phone Number"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.address"
              :rules="[() => newUser.address.length >= 1 || 'Enter a valid address']"
              label="Address"
              outlined
              required
            ></v-text-field>

            <center v-if=errorMessageStatusSignUp>
              <p style="color:red;">{{errorMessageSignUp}}</p>
            </center>

            <center>
              <v-progress-circular
                v-if="isSending"
                indeterminate
                color="#00979c"
              ></v-progress-circular>
              <v-layout row wrap>
                <v-flex text-right pr-4>
                  <v-btn
                    dark
                    color="red"
                    v-if="!isSending"
                    @click="beginLogin"
                  >
                    Back
                  </v-btn>
                </v-flex>
                <v-flex text-left pl-4>
                  <v-btn
                    v-if="!isSending"
                    :disabled="!registerValid"
                    color="#00979c"
                    :dark="registerValid"
                    @click="register"
                  >
                    Sign Up
                  </v-btn>
                </v-flex>
              </v-layout>
            </center>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="isRecoveringPassword">
      <h1 class="text-xs-center">Recover Password</h1>
      <v-layout>
        <v-flex xs12 pa-4>
          <v-form v-model="recoverValid">
            <v-text-field
              v-model="recoverEmail"
              :rules="[rules.email]"
              label="Email Address"
              :disabled="isSending"
              required
            ></v-text-field>

            <center>
              <v-progress-circular
                v-if="isSending"
                indeterminate
                color="green"
              ></v-progress-circular>
              <v-btn
                dark
                color="red"
                v-if="!isSending"
                @click="beginLogin"
              >
                Back
              </v-btn>
              <v-btn
                v-if="!isSending"
                :disabled="!recoverValid"
                color="green"
                :dark="recoverValid"
                @click="recoverPassword"
              >
              Recover
              </v-btn>
            </center>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialogRecovery" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">{{ recoveryTitle }}</v-card-title>
        <v-card-text>{{ recoveryMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="green" @click="beginLogin">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      isSending: false,
      isLoggingIn: true,
      isRegistering: false,
      isRecoveringPassword: false,
      errorMessage: '',
      errorMessageStatus: false,
      errorMessageSignUp: '',
      errorMessageStatusSignUp: false,
      show1: false,
      localToken: null,
      localUser: null,
      loginValid: false,
      registerValid: false,
      recoverValid: false,
      recoveryTitle: '',
      recoveryMessage: '',
      dialogRecovery: false,
      user: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: '',
        confPassword: '',
        phone: '',
        address: ''
      },
      recoverEmail: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email Address not valid.'
        }
      }
    }
  },
  methods: {
    reset () {
      this.user.email = ''
      this.user.password = ''
    },
    login () {
      this.isSending = true
      this.errorMessageStatus = false

      var options = {
        headers: {
          'Authorization': 'Basic ' + btoa(this.user.email + ':' + this.user.password)
        }
      }

      this.$http.post('auth', {}, options).then(response => {
        this.$cookies.set('authToken', response.body.token, '30d')
        this.$router.go(0)
      }, response => {
        if (response.status === 401) {
          this.errorMessage = 'The email or password do not match'
        } else {
          this.errorMessage = response.data.message
        }
        this.isSending = false
        this.errorMessageStatus = true
      })
    },
    register () {
      this.isSending = true
      this.errorMessageStatus = false
      var body = {
        name: this.newUser.name,
        email: this.newUser.email,
        password: this.newUser.password,
        phone: this.newUser.phone,
        address: this.newUser.address
      }
      console.log(body)
      this.$http.post('users', body).then(response => {
        this.$cookies.set('authToken', response.data.token, '30d')
        console.log('success')
        this.$router.go(0)
      }, response => {
        this.errorMessageStatusSignUp = true
        if (response.status === 409) {
          this.errorMessageSignUp = response.message
        }
        this.isSending = false
      })
    },
    recoverPassword () {
      this.isSending = true
      var options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      var passResetBody = {
        email: this.recoverEmail
      }
      this.$http.post('password-resets', passResetBody, options).then(response => {
        this.recoveryTitle = 'Correo enviado.'
        this.recoveryMessage = 'Se te ha enviado un correo con instrucciones para recuperar tu contraseña. Asegurate de revisar en tu correo no deseado.'
        this.dialogRecovery = true
        this.isSending = false
      }, response => {
        if (response.status === 404) {
          this.recoveryTitle = 'Error'
          this.recoveryMessage = 'El correo ingresado no pertenece a ningún usuario registrado, favor de verificarlo.'
          this.dialogRecovery = true
          this.isSending = false
          return
        }
        if (response.status === 0) {
          this.recoveryTitle = 'Error'
          this.recoveryMessage = 'Error conectando con servidor'
          this.dialogRecovery = true
          this.isSending = false
        }
      })
    },
    beginRegister () {
      this.isLoggingIn = false
      this.isRegistering = true
    },
    beginPasswordRecovery () {
      this.isLoggingIn = false
      this.isRecoveringPassword = true
    },
    beginLogin () {
      this.isRegistering = false
      this.isRecoveringPassword = false
      this.isLoggingIn = true
      this.dialogRecovery = false
    }
  },
  created () {
    // console.log(this.$cookies.get('authToken'))
    if (window.localStorage.user) {
      this.localToken = this.$cookies.get('authToken')
      this.localUser = JSON.parse(window.localStorage.user)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>

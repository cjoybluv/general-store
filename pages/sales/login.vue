<template>
  <v-card width="400" class="mx-auto mt-5" light color="white">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="loginForm" v-model="validForm">
        <v-text-field
          v-model="loginData.email"
          :rules="loginRules.email"
          autofocus
          label="Email"
          type="email"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="loginData.password"
          :rules="loginRules.password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" @click="gotoRegister">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      title: 'Login',
      loginData: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          (value) => !!value || 'Email is required',
          (value) =>
            value.indexOf('@') !== 0 || 'Email should have a username.',
          (value) => value.includes('@') || 'Email should include an @ symbol.',
          (value) =>
            value.indexOf('.') - value.indexOf('@') > 1 ||
            'Email should contain a valid domain.',
          (value) =>
            value.includes('.') || 'Email should include a period symbol.',
          (value) =>
            value.indexOf('.') <= value.length - 3 ||
            'Email should contain a valid domain extension.'
        ],
        password: [(value) => !!value || 'Password is required']
      },
      validForm: false,
      showPassword: false
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate()
      this.$nextTick(() => {
        if (this.validForm) {
          this.$store
            .dispatch('auth/login', this.loginData)
            .then((authData) => {
              this.$router.push({
                name: 'sales-orders'
              })
            })
            .catch(() => {})
        } else {
          // const notification = {
          //   type: 'error',
          //   message: 'FORM IS INVALID'
          // }
          // this.$store.dispatch('notification/add', notification)
        }
      })
    },
    gotoRegister() {
      this.$router.push({
        name: 'register',
        params: {
          email: this.loginData.email,
          password: this.loginData.password
        }
      })
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>

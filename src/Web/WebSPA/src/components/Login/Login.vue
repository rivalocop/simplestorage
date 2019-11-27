<template>
  <div id="login-wrapper">
    <div class="background-content"/>
    <b-form class="form-login" v-show="canShowFormLogin">
      <div class="cloud-icon"/>
      <b-row
        align-h="between" align-v="center" no-gutters
        class="login-header"
      >
        <p>Sign in</p>
        <a @click="onClickCreateAccount">Create an account</a>
      </b-row>
      <b-row no-gutters >{{ errorMessage }}</b-row>
      <b-form-group class="mt-4">
        <b-form-input
          v-model="username" size="lg"
          type="text" required placeholder="Username"
          class="mb-4"
          @keyup.enter="login()"
        />
        <b-form-input
          v-model="password" size="lg"
          type="password" required placeholder="Password"
          class="mb-r5"
          @keyup.enter="login()"
        />
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Sign in with Google
        </g-signin-button>
        <b-row align-h="between" align-v="center" no-gutters class="mt-2">
          <a>Forgot your password?</a>
          <b-button variant="primary" @click.prevent="login()">
            Login
          </b-button>
        </b-row>
        
      </b-form-group>
    </b-form>
    <b-form class="form-login" v-show="!canShowFormLogin">
      <div class="cloud-icon"/>
      <b-row
        align-h="between" align-v="center" no-gutters
        class="login-header"
      >
        <p>Create an account</p>
      </b-row>
      <b-form-group class="mt-4">
        <b-form-input
          v-model="usernameRegister" size="lg"
          type="text" required placeholder="Username"
          class="mb-4"
        />
        <b-form-input
          v-model="mailRegister" size="lg"
          type="text" required placeholder="Username"
          class="mb-4"
        />
        <b-form-input
          v-model="passwordRegister" size="lg"
          type="password" required placeholder="Password"
          class="mb-4"
        />
        <b-form-input
          v-model="passwordRegisterConfirm" size="lg"
          type="password" required placeholder="ConfirmPassword"
          class="mb-r5"
        />
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Sign in with Google
        </g-signin-button>
        <b-row align-h="between" align-v="center" no-gutters class="mt-2">
          <a @click="backToLogin">Back to login</a>
          <b-button variant="primary" @click.prevent="register()">
            Register
          </b-button>
        </b-row>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameRegister: "",
      mailRegister: "",
      passwordRegister: "",
      passwordRegisterConfirm: "",
      errorMessage: "",
      googleSignInParams: {
        client_id: '622396843070-948pa74981tpl78fl7f62i2erispe79u.apps.googleusercontent.com'
      },
      canShowFormLogin: true
    };
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      };
      if (this.username === "") {
        this.errorMessage = "Please enter username"
        return;
      }
      if (this.password === "") {
        this.errorMessage = "Please enter password"
        return;
      }
    },
    register() {

    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      console.log(profile)
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    onClickCreateAccount() {
      this.canShowFormLogin = false
    },
    backToLogin() {
      this.canShowFormLogin = true
    }
  }
};
</script>
<style lang="scss">
  #login-wrapper {
    height: 100%;
    color: white;
    .background-content {
      background-image: url("./../../assets/cloud-background.jpg");
      filter: blur(7px);
      -webkit-filter: blur(7px);
      height: 100%; 
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .form-login {
      position: absolute;
      height: 400px;
      width: 450px;
      top: 100px;
      left: calc(50% - 225px);
      .cloud-icon {
        background-image: url("./../../assets/cloud-icon.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100px;
        width: 100px;
        margin-left: 175px;
      }
      .login-header {
        p {
          font-size: 2rem
        }
      }
      .g-signin-button {
        cursor: pointer;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
      }
    }
  }
</style>



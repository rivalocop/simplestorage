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
          <a>Forgot your password?</a>
        <b-row align-h="between" align-v="center" no-gutters class="mt-2">
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            Sign in with Google
          </g-signin-button>
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
          v-model="userNameRegister" size="lg"
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
          type="password" required placeholder="Confirm Password"
          class="mb-4"
        />
        <b-form-input
          v-model="mailRegister" size="lg"
          type="text" required placeholder="Mail register"
          class="mb-r5"
        />
        <a @click="backToLogin">Back to login</a>
        <b-row align-h="between" align-v="center" no-gutters class="mt-2">
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            Sign in with Google
          </g-signin-button>
          <b-button variant="primary" @click.prevent="register()">
            Register
          </b-button>
        </b-row>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>

import { RepositoryFactory } from "./../../repositories/repositoryFactory";
const LoginRepository = RepositoryFactory.get("login");

export default {
  data() {
    return {
      username: "",
      password: "",
      userNameRegister: "",
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
      let payload = {
        name: this.username,
        password: this.password
      };
      if (this.username === "") {
        this.$toasted.error('Please enter username', {
          position: 'top-center',
          duration: 2000
        })
        return;
      } else if (this.password === "") {
        this.$toasted.error('Please enter password', 
        {
          position: 'top-center',
          duration: 2000,
          singleton: true
        })
        return;
      }
      LoginRepository.login(payload)
        .then(res => {
          if(res.data.status) {
            localStorage.setItem("userID", res.data.data._id);
            localStorage.setItem("userName", res.data.data.name);
            this.$router.push('/Dashboard')
          } else {
            this.$toasted.error('Wrong Username or Password', 
            {
              position: 'top-center',
              duration: 2000,
              singleton: true
            })
            return;
          }
        })
        .catch(err => {
          this.$toasted.error('Server: error', 
          {
            position: 'top-center',
            duration: 2000,
            singleton: true
          })
          return;
        });
    },
    register() {
      let payload = {
        userName: this.userNameRegister,
        password: this.passwordRegister,
        email: this.mailRegister
      };
      if (this.userNameRegister === '') {
        this.$toasted.error('Please enter username', {
          position: 'top-center',
          duration: 2000
        })
        return;
      } else if (this.passwordRegister === '') {
        this.$toasted.error('Please enter password', 
        {
          position: 'top-center',
          duration: 2000,
          singleton: true
        })
        return;
      } else if (this.passwordRegisterConfirm !== this.passwordRegister) {
        this.$toasted.error('Password does not match', 
        {
          position: 'top-center',
          duration: 2000,
          singleton: true
        })
        return;
      } else if (this.mailRegister === '') {
        this.$toasted.error('Please enter your email', 
        {
          position: 'top-center',
          duration: 2000,
          singleton: true
        })
        return;
      }
      LoginRepository.register(payload)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          this.$toasted.error('Register failed', 
          {
            position: 'top-center',
            duration: 2000,
            singleton: true
          })
          return;
        });
    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      let payload = {
        email: profile.U3
      }
      LoginRepository.loginWithGmail(payload)
        .then(res => {
          localStorage.setItem("userID", res.data.data._id);
          localStorage.setItem("userName", profile.ig);
          this.$router.push('Dashboard')
        })
        .catch(err => {
          this.$toasted.error('Server: Error', 
          {
            position: 'top-center',
            duration: 2000,
            singleton: true
          })
          return;
        });
    },
    onSignInError (error) {
      this.$toasted.error('Login failed', 
        {
          position: 'top-center',
          duration: 2000,
          singleton: true
        })
        return;
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
      top: 7%;
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
        padding: 9px 13px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
      }
    }
  }
</style>



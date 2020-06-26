<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/../../Dual/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Ingresar</h4>
                  <p>¡Bienvenido! Ingresá con tu cuenta</p>
                </div>
                <vs-input
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Usuario"
                  v-model="user"
                  class="w-full no-icon-border"/>
              <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span> -->

              <div class="passwordContainer">
                <vs-input
                  :type="inputPasswordType"
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Contraseña"
                  v-model="password"
                  class="w-full mt-6 no-icon-border"
                  @keyup.enter="login"
                />

                <div class="showHidePassword" v-if="password.length">
                  <button @click="showHidePassword()" type="button">
                    {{ inputPasswordType == 'password' ? 'Mostrar' : 'Ocultar' }}
                  </button>
                </div>
              </div>
              <!-- <span class="text-danger text-sm">{{ errors.first('password') }}</span> -->

              <div class="flex flex-wrap justify-between my-5">
                <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                <router-link to="/pages/forgot-password">Forgot Password?</router-link> -->
              </div>
                <!-- <vs-button  type="border" @click="registerUser">Register</vs-button> -->
                <div class="w-full flex" style="justify-content: flex-end">
                  <vs-button class="" @click="login">Ingresar</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: '',
      password: '',
      inputPasswordType: 'password',
    }
  }, // DATA
  computed: {
    validateForm() {
      return true;
      return !this.errors.any() && this.email != '' && this.password != '';
    },
  }, // COMPUTED
  methods: {
    showHidePassword() {
      if (this.inputPasswordType == 'password') {
        this.inputPasswordType = 'text';
      } else {
        this.inputPasswordType = 'password';
      }
    },
    login() {
      // Loading
      // this.$vs.loading()
      let encoded = this.encodePass(this.password);
      const payload = {
        LoginData: {
          user: this.user,
          password: this.password
        },
        allEmployees: this._allEmployees,
        notify: this.myNotify,
        decodePass: this.decodePass,
        // closeAnimation: this.$vs.loading.close
      }
    },

    notifyAlreadyLogedIn() {
      this.$vs.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
    },
  } // METHODS
} // export default
</script>

<style lang="stylus">
.passwordContainer
  width 100%
  position relative
  .showHidePassword
    padding 1px
    padding-left 0
    border-radius 0 5px 5px 0
    position absolute
    right 0
    top: 0
    height 100%
    width 75px
    button
      color #999
      height 100%
      padding: 0 15px
      border-radius 0 5px 5px 0
      border: 0
      border-left 1px solid #DDD
      cursor pointer
      width 100%
</style>

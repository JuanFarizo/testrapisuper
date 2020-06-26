<template>
  <div class="tt-color-scheme-01" v-if="_Branch.isBranchLoaded">
    <div class="tt-color-scheme-01">
      <div class="headerMsg" v-if="_Branch.headerMsg">
      <font-awesome-icon icon="exclamation-circle"/>
        {{ _Branch.headerMsg }}
      </div>
      <div v-else class="container upperBar">

        <!-- Left Side -->
        <div class="upperBar-shipping">
          <font-awesome-icon icon="shipping-fast"/>
          <i class="fas fa-" style="color: white;"></i>
          ¡ENVÍO GRATIS! Compra mínima ${{ _Branch.minimumPurchase }}
        </div>
        <div class="upperBar-time">
          <font-awesome-icon icon="phone"/>
          ¡Comprá por teléfono! {{ _AllBranchsInfo.phone }}
        </div>

        <!-- Right side -->
        <div class="tt-col-right ml-auto upperBar-social">
          <ul class="tt-social-icon" style="padding: 0; margin: 0;">
            <li>Enterate de las novedades por:</li>
            <li><a target="_blank" v-if="_SocialMedia.Facebook" :href="_SocialMedia.Facebook.url">
              <font-awesome-icon :icon="['fab', 'facebook-f']"/>
            </a></li>
            <li><a target="_blank" v-if="_SocialMedia.Instagram" :href="_SocialMedia.Instagram.url">
            <font-awesome-icon :icon="['fab', 'instagram']"/>
            </a></li>
            <li><a target="_blank" v-if="_SocialMedia.Twitter" :href="_SocialMedia.Twitter.url">
            <font-awesome-icon :icon="['fab', 'twitter']"/>
            </a></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
  }, // CREATED
  methods: {

  }, // METHODS
} // export default
</script>

<style lang="css" scoped>

.headerMsg {
  text-align: center;
  font-size: 16px;
  padding: 10px 15px;
}




.upperBar {
  display: flex;
  padding: 8px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.upperBar-time .secondLine{
  display: inline-block;
}
.upperBar-shipping {
  margin-right: 30px;
}

.upperBar-social {
  white-space: nowrap;
  margin-right: 15px;
  margin-left: auto;
}
@media (max-width: 1229px) {
  .upperBar-social {
    display: none !important;
  }
  .upperBar-time {
    margin-left: auto;
  }
}
@media (max-width: 870px) {
  .upperBar-shipping,
  .upperBar-time {
    width: 100%;
    text-align: center;
  }
  .upperBar-shipping {
    margin-right: 0;
  }
  .upperBar-time {
    margin-top: 5px;
  }
  .tt-header-row {
    padding-top: 0px;
  }
}
@media (max-width: 500px) {
  .upperBar-time .secondLine {
    width: 100%;
    margin-top: 5px;
    display: block;
  }
}

</style>

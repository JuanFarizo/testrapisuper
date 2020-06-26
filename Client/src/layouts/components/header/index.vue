<template>
  <header>
    <!-- <loader/> -->  <!-- Esto en realidad debería estar afuera del header. Son los puntitos de cuando carga -->
    <upper-bar/>
    <movile-header/>
    <div class="tt-desktop-header headerunderline">
      <desktop-header/>
        <!-- Header bottom -->
        <div class="container small-header">
          <div class="tt-header-holder">
            <categories/>
              <div class="tt-col-obj tt-obj-menu">
                <div class="tt-col-obj tt-obj-search-type2">
                  <div class="tt-search-type2">
                    <!-- search -->
                    <!-- <form :action="'/catalogue?search='" role="search"> -->
                      <div style="display: inline-block; position: relative; left: 25px;">
                        <font-awesome-icon icon="search"/>
                      </div>

                      <input v-model="localQuerySearch" @keyup="searchKeyup" @keydown="searchKeydown"
                      @keyup.enter.native="clickOnSearchBtn(localQuerySearch)"
                      class="searchInput myHeight unPocoMovido tt-search-input" type="search" placeholder="Buscar productos, marcas, etc..." aria-label="Buscar productos, marcas, etc..."
                      autocomplete="false" readonly onfocus="this.removeAttribute('readonly');"> <!-- Esto es para desabilitar el autocomplete. Ase que sea readonly, pero writeable onfocus -->
                      <!-- @input="checkSearchTimer()" -->

                      <button type="button" class="searchBtn myHeight unPocoMovido tt-btn-search" @click="clickOnSearchBtn(localQuerySearch)">BUSCAR</button>
                      <div class="search-results" style="display: none;"></div>
                    <!-- </form> -->
                  </div>
                </div>
              </div>
              <div class="tt-col-obj tt-obj-options obj-move-right" v-if="headerCartActive">
                <account/>
                <cart/>
              </div>
          </div>
      </div>
    </div>

    <!-- stuck nav -->
    <div class="tt-stuck-nav">
      <div class="container">
        <div class="tt-header-row ">
          <div class="tt-stuck-desctop-menu-categories"></div>
          <div class="tt-stuck-parent-menu"></div>
          <div class="tt-stuck-mobile-menu-categories"></div>
          <div class="tt-stuck-parent-search tt-parent-box"></div>
          <div class="tt-stuck-parent-cart tt-parent-box"></div>
          <div class="tt-stuck-parent-account tt-parent-box"></div>
          <div class="tt-stuck-parent-multi tt-parent-box"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  components: {
    Loader: () => import('./Header-Loader.vue'),
    UpperBar: () => import('./Header-UpperBar.vue'),
    MovileHeader: () => import('./Header-MovileHeader.vue'),
    DesktopHeader: () => import('./Header-DesktopHeader.vue'),
    Categories: () => import('./Header-Categories.vue'),
    Account: () => import('./Header-Account.vue'),
    Cart: () => import('./Header-Cart.vue'),
  },
  data() {
    return {
    }; // return DATA
  }, // DATA
  props:{
    headerCartActive: {default: true}
  },
  computed: {
    localQuerySearch: {
      get() {
        return this._ProductsQuery.search;
      },
      set: function(val) {
        this.checkRedirectionToCatalogue(val);
        this.$store.dispatch("products/updateQuerySearch", val);
      },
    },
  }, // COMPUTED
  methods: {

      searchKeyup() {
        // on keyup, start the countdown
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.doneTyping, this.doneTypingInterval);
      },

      searchKeydown() {
        // on keydown, clear the countdown
        clearTimeout(this.typingTimer);
      },
  },
} // export default
</script>

<style lang="css" scoped>

.myHeight {
  height: 41px;
}
.unPocoMovido {
  position: relative;
  left: -30px;
}
.searchBtn {
  border-radius: 0px 10px 0px 0px;
}
.searchInput {
  border-radius: 10px 0px 0px 0px;
}
</style>

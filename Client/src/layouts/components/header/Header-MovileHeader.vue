<template>
  <div class="tt-mobile-header">

    <div class="headerRow-icons">
      <!-- <div class="tt-mobile-parent-menu">
        <div class="tt-menu-toggle stylization-02">
          <i class="icon-03"></i>
        </div>
      </div> -->
      <!-- <div class="tt-mobile-parent-menu-categories tt-parent-box">
        <button class="tt-categories-toggle">
          <i class="icon-categories"></i>
        </button>
      </div> -->


      <!-- hamburger -->
      <div @click="toggleMovileSidebarMenu(true);" class="header-movile-icon secondaryColor">
        <font-awesome-icon icon="bars"/>
      </div>

      <!-- search -->
      <div @click="toggleShowSearchMovile(true)" class="header-movile-icon secondaryColor" >
        <font-awesome-icon icon="search"/>
      </div>


      <!-- account -->
      <!-- <router-link :to="{ name: 'profile' }" class="header-movile-icon secondaryColor" >
        <font-awesome-icon icon="user"/>
      </router-link> -->

      <!-- cart -->
      <router-link :to="{ name: 'cart' }" class="header-movile-icon secondaryColor" >
        <font-awesome-icon icon="shopping-cart"/>
        <span class="badge-cart-movile mainBGColor" style="color: white">
          {{ Cart.totalItemsAmount }}
        </span>
      </router-link>

    </div> <!-- headerRow-icons -->





    <!-- SEARCH ROW -->
    <div v-if="showSearchMovile" class="headerRow-search tt-top-line">
      <!-- Back -->
      <div class="movileSearch-back" @click="toggleShowSearchMovile(false);">
        <font-awesome-icon icon="arrow-left"/>
      </div>
      <!-- Input -->
      <input ref="movileSearch" v-model="localQuerySearch"
      class="movileSearch-input" autocomplete="off"
      placeholder="Buscar productos, marcas, etc"
      @keyup.esc="toggleShowSearchMovile(false)"
      />
      <!-- Button -->
      <vs-button class="movileSearch-btn">
        <font-awesome-icon icon="search"/>
      </vs-button>
      <!-- Clear text -->
      <div class="movileSearch-clearText" @click="clearText()" v-if="localQuerySearch.length">
        <font-awesome-icon icon="times"/>
      </div>
    </div>


    <!-- LOGO ROW -->
    <div class="container-fluid tt-top-line">
      <div class="row">
        <div class="tt-logo-container">
          <router-link :to="{ name: 'index' }" class="tt-logo tt-logo-alignment">
            <img :src="getImg('logo/clientHeader.png')" alt="Rapisuper">
          </router-link>
        </div>
      </div>
    </div> <!-- logo row -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      staticVar: true,
      showMovileMenu: false,
      showSearchMovile: false,
    }
  }, // DATA
  created() {
    if (this.localQuerySearch) {
      this.toggleShowSearchMovile(true);
    }
  }, // CREATED
  watch: {
  }, // WATCH
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
    clearText() {
      this.localQuerySearch = '';
      this.$refs.movileSearch.focus();
    },
    closeSearch() {
      this.toggleShowSearchMovile(false);
    },
    toggleMovileSidebarMenu() {
      this.$store.dispatch('layout/toggleLayout', 'movileSidebarMenu');
    },
    toggleShowSearchMovile(val = null) {
      if (val == null) val = !this.showSearchMovile;
      this.showSearchMovile = val;
      // After v-if show the input
      if (!val) {
        this.clearText();
      }
      if (val) {
        this.$nextTick(() => {
          this.$refs.movileSearch.focus();
        })
      }
    },
  }, // METHODS
}
</script>

<style lang="scss" scoped>
.headerRow-search {
  // border-top: 1px solid #e9e7e7;
  // border-bottom: 1px solid #e9e7e7;
}
.headerRow-icons,
.headerRow-search {
  position: relative;
  min-height: 50px;
  max-height: 50px;
  width: 100%;
}
.headerRow-icons {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: flex-start;
  align-items: center;
  padding-left:  15px;
  padding-right: 15px;
  @media(max-width: 600px) {
    padding-left:  0px;
    padding-right: 0px;
  }
}
.header-movile-icon svg {
  font-size: 22px;
  margin-top: 4px;
}
.header-movile-icon {
  margin-left: 30px;
  cursor: pointer;
  padding: 10px 20px;
  @media(max-width: 600px) {
    padding-left:  5px;
    padding-right: 5px;
  }
  @media(max-width: 450px) {
    padding-left:  0px;
    padding-right: 0px;
  }
}
.badge-cart-movile {
  position: relative;
  top: -12px;
  left: -5px;
  padding: 4px 8px 4px 4px;
  border-radius: 100px;
}
.buttonSearchIcon {
  cursor: pointer;
  background-color: red;
}
.movileSearch-btn {
  position: absolute;
  top: 0;
  right: 0px;
  cursor: pointer;
  padding-right: 15px !important;
  padding-left: 20px !important;
  border-radius: 30px 0 0 30px;
  height: 50px;
}
.movileSearch-input {
  border: none;
  width: 100%;
  padding: 10px 60px;
  font-size: 16px;
  height: 50px;
  background-color: transparent;
}
.movileSearch-clearText,
.movileSearch-back{
  position: absolute;
  font-size: 20px;
  padding: 5px 10px;
  cursor: pointer;
}
.movileSearch-clearText {
  top: 10px;
  right: 50px;
  // right: 10px;
}
.movileSearch-back{
  top: 9px;
  left: 10px;
}
</style>

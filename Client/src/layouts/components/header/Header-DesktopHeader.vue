<template>
  <div class="container">
    <div class="tt-header-holder">
      <div class="tt-col-obj tt-obj-logo">
        <!-- logo -->
        <router-link :to="{ name: 'index' }" class="tt-logo tt-logo-alignment">
          <img :src="getImg('logo/clientHeader.png')" alt="Rapisuper">
        </router-link>
        <!-- /logo -->
      </div>
      <div class="tt-col-obj tt-obj-menu">
        <!-- tt-menu -->
        <div class="tt-desctop-parent-menu tt-parent-box">
          <div class="tt-desctop-menu ">
            <nav>
              <ul>
                <router-link v-for="Item in navItems" v-if="!Item.onlyMovile" :to="{ name: Item.route }" tag="li" class="dropdown" active-class="selected">
                  <a>{{ Item.name.toUpperCase() }}</a>
                </router-link>
              </ul>
            </nav>
            
          </div>
          <!-- <div class="item-user-uppbar" style="margin-top:8px;">
            <div style="margin-right: 10px">
              <router-link :to="{ name: 'account' }">LOGIN</router-link>
            </div>
            <div>
              <router-link :to="{ name: 'register' }">REGISTRATE</router-link>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navItems from '../navItems.js';
export default {
  data() {
    return {
      navItems,
    } // return DATA
  }, // DATA
} // export default
</script>

<style lang="css" scoped>
.item-user-uppbar{
  position: absolute;
  right: 0;
  bottom:0;
  display:flex;
  flex-direction:row;
  justify-items: right;
}

</style>

<template>
  <div class="">
    <template v-if="_LayoutIsActive.movileSidebarMenu">
      <div class="sidebarBackground" @click="closeSidebar()"></div>
      <div class="menuSidebar">
        <div class="menuHeader">
          <router-link :to="{ name: 'index' }">
            <img :src="getImg('logo/clientHeader.png')">
          </router-link>
          <div class="closeSidebar" @click="closeSidebar">
            <font-awesome-icon icon="times"/>
          </div>
        </div>
        <ul>
          <li @click="closeSidebar" v-for="Item in navItems">
            <router-link class="sidebarItem" :to="{ name: Item.route }" tag="div">
            <font-awesome-icon :icon="Item.icon" class="icon"/>
              {{ Item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import navItems from './navItems.js';
export default {
  data() {
    return {
      isSidebarActiveLocal: true,
      navItems,
    };
  }, // DATA
  computed: {
  }, // COMPUTED
  methods: {
    closeSidebar() {
      this.$store.dispatch('layout/hideLayout', 'movileSidebarMenu');
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
.menuSidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: white;
  z-index: 100000;
  filter: drop-shadow(0 0 15px rgba(0,0,0,.1));
}
.menuHeader {
  text-align: center;
  padding: 20px 35px;;
  border-bottom: 1px solid lightgrey;
  color: white;
  font-size: 20px;
  position: relative;
}
.menuHeader img {
  max-width: 100%;
}
.closeSidebar {
  position: absolute;
  top: 1px;
  right: 4px;
  color: #22223E;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
}
.sidebarItem {
  border-left: 5px solid transparent;
  padding: 25px 40px;
  border-bottom: 1px solid lightgrey;
  font-size: 18px;
  color: #22223E;
  cursor: pointer;
}
.sidebarItem:hover {
  color: #15B0CE;
}
.sidebarItem .icon {
  font-size: 16px;
  margin-bottom: 1px;
  margin-right: 5px;
}
.router-link-active {
  border-left: 5px solid #15B0CE;
  background-color: #15B0CE;
  color: white;
}
.router-link-active:hover {
  background-color: #1399B3;
  color: white;
}
</style>

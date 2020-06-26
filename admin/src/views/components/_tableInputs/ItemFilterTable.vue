<template>
  <div class="lineContainer">
    <vs-input type="text" v-model="search" icon="search"
    @input="searchInput()" class="searchInput"/>
    <button type="button" class="filterIcon">
      <font-awesome-icon icon="filter"/>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    } // return DATA
  }, // DATA
  methods: {
    searchInput() {
      console.log(this.search);
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.filterIcon {
  position: relative;
  position: absolute;
  right: 0;
  top: 5px;
  padding: 5px;
}

.lineContainer {
  position: relative;
  background-color: red;
  width: 200px;
  .searchInput {
    width: 100%;
    padding-right: 30px;
  }
}
.searchInput /deep/ div input {
  width: 100%;
}

</style>

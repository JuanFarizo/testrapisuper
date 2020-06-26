<template>
  <!-- <div style="display: inline-block;"> -->
    <vs-input v-model="search" @input="checkSearchTimer()" placeholder="Buscar..."/>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      search: '',
    } // return DATA
  }, // DATA
  methods: {
    checkSearchTimer() {
      const search = this.search;
      const vm = this;
      setTimeout(() => {
        if (search == vm.search) {
          this.$emit('searchInput', this.search);
        }
      }, this.doneTypingInterval);
    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
</style>

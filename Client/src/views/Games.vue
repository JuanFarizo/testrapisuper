<template>
  <div class="mainContent">
    <Simon/>
  </div>
</template>

<script>
export default {
  components: {
    Simon: () => import('./components/games/Simon.vue'),
  },
  data() {
    return {
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
} // export default
</script>

<style lang="scss">
.mainContent {
  padding: 0 30px;
}
</style>

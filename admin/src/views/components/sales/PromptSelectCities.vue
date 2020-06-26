<template>

  <vs-dropdown vs-custom-content vs-trigger-click >
    <div class="citiesBtn">
      <font-awesome-icon icon="map-marker-alt"/>
      Ciudades
      <vs-icon class="" icon="expand_more"></vs-icon>
    </div>

    <vs-dropdown-menu>
      <div class="con-exemple-prompt p-3">
        <div class="mb-3 text-center"><b>Ciudades</b></div>

        <!-- :id="`filterCity${City.id}`" -->
        <div :id="`filterCity${City.id}`"
        v-for="City in _allCities">
          <vs-checkbox class="mb-2"
            v-model="selectedCities" :vs-value="City">
            {{ City.name }}
          </vs-checkbox>
        </div>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>

</template>

<script>
export default {
  data() {
    return {
      isPromptActiveLocal: true,
      selectedCities: [],
    }; // return DATA
  }, // DATA
  computed: {
  }, // COMPUTED
  watch: {
    selectedCities: function(val) {
      this.$emit('filterCities', val)
    },
  }, // WATCH
  created() {
  }, // CREATED

  methods: {
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>
  .citiesBtn {
    color: #15B0CE;
    cursor: pointer;
  }
</style>

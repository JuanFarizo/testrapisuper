<template>
  <vs-popup :active.sync="isPromptActiveLocal"
  :title="`Stock de ${ProductOfBranch.fullName}`">
    <div class="mainContent">
      <div class="imgContainer mx-auto">
        <img :src="getImgDual(`${ProductOfBranch.productID}-1`)"/>
      </div>
      Hay
      <span class="stockNum">{{ ProductOfBranch.stock }}</span>
      en stock
    </div>
  </vs-popup>
</template>

<script>
export default {
  props: {
    isPromptActive: { type: Boolean, required: true, },
    ProductOfBranch: { type: Object, required: true, },
  }, // PROPS

  data() {
    return {
    } // return DATA
  }, // DATA

  computed: {
    isPromptActiveLocal: {
      get(val) {
        return this.isPromptActive;
      },
      set(val) {
        if (val) return;
        this.$emit('closePrompt');
      }
    },
  }, // COMPUTED

  watch: {
  }, // WATCH

  methods: {
  }, // METHODS

} // export default
</script>

<style lang="scss" scoped>

  .mainContent {
    margin: 50px 0;
    font-size: 20px;
    text-align: center;
    .imgContainer {
      margin-bottom: 25px;
    }
    .stockNum {
      background-color: #DDD;
      color: #15B0CE;
      font-weight: bold;
      padding: 4px 9px;
      border-radius: 15px;
    }
  }

</style>

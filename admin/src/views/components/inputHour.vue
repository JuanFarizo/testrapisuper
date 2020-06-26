<template>
  <div class="">
    <vs-input type="time" v-model="localValue" :label="label"
     :class="{textCenter: textCenter}"/>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, required: false, },
    label: { type: String, required: false, },
    textCenter: { type: Boolean, default: false, },
  }, // PROPS

  computed: {
    localValue: {
      get() {
        return this.minToHour(this.value);
      },
      set(val) {
        let newValue = this.hourToMin(val);
        this.$emit('input', newValue);
      }
    }
  },
}
</script>

<style lang="scss" scoped>

.textCenter /deep/ div input {
  text-align: center;
}

</style>

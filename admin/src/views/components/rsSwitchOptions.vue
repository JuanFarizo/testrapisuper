<template>
  <div>
    <div class="container">
      <div class="subContainer">
        <div class="optionContainer"
        v-for="Option in options">
          <div class="option" :class="{ selected: selectedOption == Option.id }"
          @click="selectedOption = Option.id">
            {{ Option[label] }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, required: true, },
    label: { type: String, default: 'name', },
    value: { type: Number, default: 0, },
  }, // PROPS
  data() {
    return {
    } // return DATA
  }, // DATA
  computed: {
    selectedOption: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  }, // COMPUTED

  watch: {
  }, // WATCH

} // export default
</script>

<style lang="scss" scoped>

  .container {
    padding: 7px;
    padding-right: 0;
    border-radius: 5px;
    background-color: #EEE;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
    .subContainer {
      width: 100%;
      .optionContainer {
        padding-right: 7px;
        width: 50%;
        display: inline-block;
        .option {
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          width: 100%;
          background-color: #9ADFEC;
          border-radius: 5px;
          text-align: center;
          color: #333333;
          // padding: 7px;
          padding: 5px;
          cursor: pointer;
          transition: transform .2s; /* Animation */
        }
        .option:hover {
          transform: scale(1.05);
        }
        .option.selected {
          background-color: #15B0CE;
          color: white;
        }
      }
    }
  }

</style>

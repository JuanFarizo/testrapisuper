<template>
  <!-- <vs-button color="primary" type="filled" class="columnsManagerBtn" @click="vmMain.manageColumns()">
    <font-awesome-icon icon="columns"/>
  </vs-button> -->
  <div style="display: inline-block;">
    <vs-button color="primary" type="filled" class="columnsManagerBtn" @click="vmMain.manageColumns()">
      <font-awesome-icon icon="columns"/>
    </vs-button>
  </div>

  <!-- <div style="display: inline-block; background-color: red;">
    <font-awesome-icon icon="columns"/>
  </div> -->


</template>

<script>
export default {
  props: {
    vmMain: { type: Object, required: true, },
  },
} // export default
</script>

<style lang="css" scoped>

.columnsManagerBtn {
  padding: 7px 12px 7px 12px !important;
  font-size: 20px;
}

</style>

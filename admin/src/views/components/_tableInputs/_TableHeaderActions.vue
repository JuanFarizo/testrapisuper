<template>
  <div class="mainContainer">
    <ItemsPerPage v-if="itemsPerPage"
    :itemsLength="itemsLength"
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    class="item tableSecondHeaderItem itemsPerPage"
    @newItemsPerPage="$emit('newItemsPerPage',$event)"
    />
    <div class="subContainer">
      <TableSearch v-if="!hideSearch" @searchInput="$emit('searchInput', $event)" class="item tableSecondHeaderItem searchInput"/>
      <ColumnsManager :vmMain="vmMain" class="item tableSecondHeaderItem columnsManager" v-if="!hideColumnsManager"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // props are required by the inner element
    vmMain:       { type: Object, default: null },
    itemsLength:  { type: Number, default: null },
    currentPage:  { type: Number, default: null },
    itemsPerPage: { type: Number, default: null },
    hideColumnsManager:  { type: Boolean, default: false },
    hideSearch: { type: Boolean, default: false, },
  },
} // export default
</script>

<style lang="scss" scoped>

.mainContainer {
  display: inline-flex;
  flex-wrap: wrap;
  margin-left: auto;
  .subContainer {
    display: inline-flex;
  }
}
.itemsPerPage {
  margin-left: auto;
}
.item {
  margin-left: 5px;
}
@media (max-width: 650px) {
  .itemsPerPage {
    margin-left: 0;
  }
  .searchInput {
    flex-grow: 1;
  }
  .mainContainer {
    width: 100%;
  }
  .subContainer {
    flex-grow: 1;
  }
}
@media (max-width: 415px) {
  .itemsPerPage {
    width: 100%;
  }
  .subContainer {
    display: flex !important;
    .searchInput {
      margin-left: 0px;
    }
  }
}

</style>

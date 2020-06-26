<template>
  <div class="employeeImgContainer">
    <div class="imgContainer userImg">
      <img :src="getImg(`employees/${localEmployeeID}.png`)"/>
    </div>
    <div v-if="showName">
      {{ Employee.fullName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Employee: { type: Object, default: null, },
    employeeID: { type: Number, default: null, },
    showName: { type: Boolean, default: false, },
  }, // PROPS
  data() {
    return {
      localEmployeeID: null,
    } // return DATA
  }, // DATA
  watch: {
    Employee() {
      this.locaEmployeeID = this.Employee.id;
    },
    employeeID(val) {
      this.locaEmployeeID = val;
    },
  },
  created() {
    if (this.employeeID = null) {
      this.localEmployeeID = this.employeeID;
    }
    if (this.Employee != null) {
      this.localEmployeeID = this.Employee.id;
    }
  },
} // export default
</script>

<style lang="scss" scoped>
  .employeeImgContainer {
    position: relative;
  }
  .userImg {
    height: 40px;
    width:  40px;
    border-radius: 50px;
  }

</style>

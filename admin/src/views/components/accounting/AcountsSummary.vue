<template>
  <!-- Resumen Cuentas -->
  <div class="my-5">
    <vs-row>
      <vs-col v-for="(account,index) in allAccounts" :key="index" vs-w="2" vs-sm="6">

        <vs-card :style="'background: '+ account.color">
          <div slot="header">
            <h3 class="text-center">
              {{account.name}}
            </h3>
          </div>
          <div class="text-center priceText">
            <span>${{ addPoints(account.value)}}</span>
          </div>

          <div class="text-center">
            <vs-button type="" @click="vmMain.editAccountStart(index)">
              <font-awesome-icon icon="edit" color="black" />
            </vs-button>
          </div>

        </vs-card>
      </vs-col>

      <!-- New account -->
      <vs-col vs-w="2" vs-sm="6">
        <vs-button style="height: 126px;" @click="vmMain.IsPromptActive.newAccount = true" type="border">
          <font-awesome-icon icon="plus"/> Nueva cuenta
        </vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  props: {
    vmMain: { type: Object, required: true, },
    allAccounts: { type: Array, required: true, },
  }, // PROPS
} // export default
</script>

<style lang="scss" scoped>
.priceText {
  color: black;
  font-size: 15px;
  font-weight: 500;
}
</style>

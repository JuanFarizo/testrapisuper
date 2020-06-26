<template>
  <div class="collapseDiv" v-if="Products.length">
    <vs-collapse>
      <vs-collapse-item>

        <vs-button v-if="areItemsToCopy(Store)" v-for="Store in storesList" @click="copyListStore(Store)" type="border" class="mb-3">
          <font-awesome-icon :icon="['far', 'copy']"/>
          {{ Store.store }}
        </vs-button>


        <div slot="header">
          <span class="amountLabel" :class="{success: receivedProducts == Products.length}">
            {{ receivedProducts }} /
            {{ orderedProducts }} /
            {{ Products.length }}
          </span>
          <h3 style="display: inline-block;">
            Productos que necesitan retiro
          </h3>
        </div>
        <vs-table :data="Products" noDataText="No hay productos que buscar">
          <template slot="thead">
            <vs-th v-for="Col in Columns" class="nowrap">
              {{ Col.title }}
            </vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td class="autoWidth" v-if="!IsHidden.id">
                {{ tr.id }}
              </vs-td>
              <vs-td class="autoWidth" v-if="!IsHidden.productID">
                {{ tr.productID }}
              </vs-td>
              <vs-td style="width: 220px;" v-if="!IsHidden.state">
                <div class="stepsGroup unselectable">
                  <div @click="changeStep(tr, 1)" class="step" :class="{filled: tr.pickUpStateID >= 1}">
                    Pedido
                  </div>
                  <div @click="changeStep(tr, 2)" class="step" :class="{filled: tr.pickUpStateID >= 2}">
                    Recibido
                  </div>
                </div>
              </vs-td>
              <vs-td class="autoWidth" v-if="!IsHidden.product">
                <div class="imgContainer">
                  <img :src="getImgDual(`${tr.productID}-1`)">
                </div>
              </vs-td>
              <vs-td style="font-weight: 600">
                <b>{{ tr.amount }}x</b>
                <span class="ml-2">{{ tr.fullName }}</span>
              </vs-td>
              <vs-td>
                {{ tr.receptionTimeFull }}
              </vs-td>
              <vs-td>
                {{ tr.buyerFullName }}
              </vs-td>
              <vs-td>
                {{ tr.pickUpPlace }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-collapse-item>
    </vs-collapse>
  </div>
</template>

<script>
export default {
  props: {
    Products: { type: Array, required: true, },
  }, // PROPS
  data() {
    return {
      Columns: [
        // { name: 'id',  title: 'ID', },
        // { name: 'productID',  title: 'ID Producto', },
        { name: 'isOrdered',  title: 'Pedido', },
        { name: 'isReceived', title: 'Recibido', },
        { name: 'product',    title: 'Producto', },
        { name: 'time',       title: 'Hora', },
        { name: 'sale',       title: 'Compra', },
        { name: 'place',      title: 'Local', },
      ],
      IsHidden: { id: true, productID: true, },
      // storesList: [{ id: 1, store: 'Pollos Weiman'}],
    }; // return DATA
  }, // DATA
  computed: {
    orderedProducts: function() {
      let total = 0;
      for (let Prod of this.Products) {
        if (Prod.pickUpStateID >= this._localDB.ProductPickUpStateIDs.Pedido) {
          total++;
        }
      }
      return total;
    },
    receivedProducts: function() {
      let total = 0;
      for (let Prod of this.Products) {
        if (Prod.pickUpStateID >= this._localDB.ProductPickUpStateIDs.Recibido) {
          total++;
        }
      }
      return total;
    },
    storesList() {
      let list = [];
      for (let SaleProd of this.Products) {
        // check if the store is in the list
        let isFinded = false;
        for (let Store of list) {
          if (SaleProd.pickUpPlaceID == Store.id) {
            isFinded = true;
            break;
          }
        }
        // add the store to the list
        if (!isFinded) {
          let StoreToAdd = {
            id: SaleProd.pickUpPlaceID,
            store: SaleProd.pickUpPlace,
          }
          list.push(StoreToAdd)
        }
      }
      return list;
    },
  }, // COMPUTED
  methods: {
    // areItemsToCopy
    // changeStep
    // copyListStore
    areItemsToCopy(Store) {
      for (let SaleProd of this.Products) {
        if (SaleProd.pickUpStateID == this._localDB.ProductPickUpStateIDs.SinEncargar) {
          return true;
        }
      }
      return false;
    },
    changeStep(tr, num) {
      if (num == tr.pickUpStateID) {
        num--;
      }
      tr.pickUpStateID = num;
      let Params = {
        saleProdID: tr.id,
        pickUpStateID: num,
      }
      this.modifyPickUpStateDB(Params);
    },
    copyListStore(Store) {
      let text = '';
      for (let SaleProd of this.Products) {
        if (SaleProd.pickUpStateID == this._localDB.ProductPickUpStateIDs.SinEncargar) {
          text += `*${SaleProd.amount}x* ${SaleProd.fullName}\r\n`;
          // SaleProd.pickUpStateID = this._localDB.ProductPickUpStateIDs.Pedido;
          this.changeStep(SaleProd, this._localDB.ProductPickUpStateIDs.Pedido);
        }
      }
      if (!text) {
        this.myNotify('warning', 'Atención', 'No hay productos para copiar');
        return;
      }
      let msg = `Lista copiada para ${Store.store}`;
      this.copyToClipboard(text, msg);
    },
    modifyPickUpStateDB(Params) {
      this.conectToDB({
        file: 'Sales', action: 'modifySaleUProduct', params: Params,
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        },
      });
    },
  } // METHODS
} // export default
</script>

<style lang="scss">
.amountLabel {
  // width: 40px;
  // height: 40px;
  color: white;
  padding: 6px 12px;
  border-radius: 40px;
  text-align: center;
  display: inline-block;
  font-size: 15px;
  margin-right: 15px;
  background: #15B0CE;
}
.amountLabel.success {
  // background: #28C76F;
  background: #EEEEEE;
  color: #2C2C2C;
}
.collapseDiv {
  border: 1px solid #EEEEEE;
  background: #EEEEEE;
  background-color: white;
  margin-bottom: 30px;
}
</style>

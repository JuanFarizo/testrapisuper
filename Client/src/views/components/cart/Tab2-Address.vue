<template>
  <div class="cartTab">
    <!-- <div class="tabTitle">Envío</div> -->

    <div class="vx-row" v-if="hasAccount">
      <!-- LEFT COL: NEW ADDRESS -->
      <div class="vx-col lg:w-2/3 w-full">
        <vx-card v-if="!addNewAddress && !addNewReceiver">

          <h5>Recibe</h5>
          <ul>
            <!-- <vs-radio v-model="localSelectedReceiverID" vs-name="receiver" vs-value="1">Luis</vs-radio>
            <vs-radio v-model="localSelectedReceiverID" vs-name="receiver" vs-value="2">Juan</vs-radio> -->
            <li v-for="Item in ReceiverList">
              <vs-radio v-model="localSelectedReceiverID" :vs-value="Item.id" vs-name="receiver" class="mt-2">
                {{ getFullName(Item) }}
              </vs-radio>
            </li>
          </ul>
          <vs-button class="mt-6 flex" @click.prevent="addNewReceiver = true">Agregar nuevo destinatario</vs-button>

          <vs-divider />

          <h5 class="mt-6">Dirección</h5>
          <ul>
            <li v-for="Address in AddressList">
              <vs-radio v-model="localSelectedAddressID" :vs-value="Address.id" vs-name="address" class="mt-2">
                {{ getFullAddress(Address, ['extraReferences']) }}
              </vs-radio>
            </li>
          </ul>
          <vs-button class="mt-6 flex" @click.prevent="addNewAddress = true">Agregar nueva dirección</vs-button>
        </vx-card>

        <!-- Add new receiver -->
        <vx-card v-if="addNewReceiver" title="Agregar nuevo destinatario" subtitle="Podés guardar varios destinatarios" class="mb-base">
          <form data-vv-scope="add-new-receiver">

            <div class="vx-row">
              <!-- Name -->
              <div class="vx-col sm:w-1/2 w-full mt-3">
                <vs-input label="Nombre *" v-model="NewReceiver.name" class="w-full"/>
              </div>
              <!-- Surname -->
              <div class="vx-col sm:w-1/2 w-full mt-3">
                <vs-input label="Apellido *" v-model="NewReceiver.surname" class="w-full"/>
              </div>
            </div>
            <!-- Phone -->
            <div class="vx-row">
              <div class="vx-col w-full mt-3">
                <vs-input label="Teléfono / celular" v-model="NewReceiver.phone" class="w-full"/>
              </div>
            </div>

            <div class="ml-auto mt-6 flex" style="justify-content: flex-end;">
              <vs-button @click.prevent="addNewReceiver = false" class="mr-2" color="danger">Cancelar</vs-button>
              <vs-button @click.prevent="saveNewReceiver">GUARDAR</vs-button>
            </div>
          </form>
        </vx-card> <!-- END New receiver -->


        <!-- New address -->
        <vx-card v-if="addNewAddress" title="Agregar nueva dirección" subtitle="Podés guardar varias direcciones" class="mb-base">
          <form data-vv-scope="add-new-address">

            <div class="vx-row">
            <!-- Street name -->
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input label="Calle *" v-model="NewAddress.streetName" class="w-full"/>
                <!-- <span v-if="Validate.streetName" class="text-danger">Campo obligatorio</span> -->
              </div>
              <!-- Street number -->
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input label="Número de calle *" v-model="NewAddress.streetNumber" class="w-full"/>
                <!-- <span v-if="Validate.streetNumber" class="text-danger">Campo obligatorio</span> -->
              </div>
            </div>

            <div class="vx-row">
              <!-- Floor And Department -->
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input label="Piso / Departamento:" v-model="NewAddress.floorAndDepartment" class="w-full mt-3"/>
              </div>
              <!-- City -->
              <div class="vx-col sm:w-1/2 w-full">
                <!--
                <vs-select label="Ciudad *" v-model="NewAddress.cityID" class="w-full mt-3">
                  <vs-select-item :value="item.id" :text="item.name" v-for="(item,index) in _allCities" />
                </vs-select>
                -->
              </div>
            </div>

            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-input label="Referencias extra" v-model="NewAddress.extraReferences" class="w-full mt-3"/>
              </div>
            </div>

            <!-- Buttons -->
            <div class="ml-auto mt-6 flex" style="justify-content: flex-end;">
              <vs-button @click.prevent="addNewAddress = false" class="mr-2" color="danger">Cancelar</vs-button>
              <vs-button @click.prevent="saveNewAddress">GUARDAR</vs-button>
            </div>
          </form>
        </vx-card> <!-- END New Addres -->
      </div>

      <!-- RIGHT COL: CONTINUE WITH SAVED ADDRESS -->
      <div class="vx-col lg:w-1/3 w-full">
        <vx-card title="Resumen de envío">
          <div>
            <p class="receiverText mt-0">{{ getFullName(Cart.Receiver) }}</p>
          </div>
          <div>
            <p>{{ getFullAddress(Cart.Address, ['city', 'extraReferences']) }}</p>
            <p>{{ Cart.Address.city }}, Santa Fe</p>
            <p v-if="Cart.Address.extraReferences">({{ Cart.Address.extraReferences }})</p>
            <p v-if="Cart.Receiver.phone">{{ Cart.Receiver.phone }}</p>
          </div>

          <vs-divider />

          <vs-button class="w-full" @click"checkNextTab()">ENVIAR A ESTA DIRECCIÓN</vs-button>
        </vx-card>
      </div>
    </div>



    <!-- NO TIENE CUENTA -->
    <div v-if="!hasAccount">
      <vx-card class="noHasAccountForm" title="Información de envío">

        <div class="vx-row">
          <h6 class="newUser-subtitle">Información personal</h6>
        </div>

        <div v-if="checkUser('')" class="mb-4 mt-2">
          <div v-if="checkUser('gestion')" class="flex">
            <div class="imgContainer" style="display: inline-block;">
              <img :src="getImg(`employees/${localSelectedBuyerEmployeeID}.png`)">
            </div>
            <div class="ml-3" style="flex-grow: 1">
              <p class="mt-4 mb-3">Anotarlo para:</p>
              <v-select :options="_allEmployeesAndNone" :reduce="Employee => Employee.id"
                label="fullName" v-model="localSelectedBuyerEmployeeID" class="w-full"/>
            </div>
          </div>
          <div v-else>
            <vs-checkbox v-model="isForMe">Anotarlo para mi</vs-checkbox>
          </div>
          <!-- isReceived -->
          <div class="">
            <vs-checkbox v-model="isReceived" class="mt-3">Entregado</vs-checkbox>
          </div>

        </div>

        <!-- personal info -->
        <template v-if="localSelectedBuyerEmployeeID == 0">
          <div class="vx-row">
            <!-- Name -->
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Nombre *" v-model="NewReceiver.name" class="w-full"/>
            </div>
            <!-- Surname -->
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Apellido *" v-model="NewReceiver.surname" class="w-full"/>
            </div>
          </div>
          <!-- Phone -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input label="Teléfono / celular" v-model="NewReceiver.phone" class="w-full mt-3"/>
            </div>
          </div>
        </template>

        <!-- TIPO DE ENTREGA -->
        <vs-divider class="mt-5 mb-4" />

        <div class="vx-row">
          <h6 class="newUser-subtitle">Tipo de entrega</h6>
        </div>
        <div class="vx-row" style="margin-left: 15px">
          <vs-radio vs-name="shipping" v-model="shippingNeeded" :vs-value="1">
            Envío a domicilio -
            <span class="text-success">Gratis!</span>
          </vs-radio>
          <vs-radio vs-name="shipping" class="shippingMethodItem" v-model="shippingNeeded" :vs-value="0">
            Retiro en local
          </vs-radio>
        </div>
        <div class="vx-row" style="margin-left: 15px" v-if="!shippingNeeded">
          <div class="paymentInfoText">
            <div>
              <font-awesome-icon icon="map-marker-alt"/>
              El retiro en el local es en {{ _Branch.address}}, {{_Branch.city}}
            </div>
            <div class="mt-3">
              <font-awesome-icon :icon="['fas', 'clock']"/>
              <router-link :to="{ name: 'shippingTime' }">
                <font-awesome-icon icon="mouse-pointer"/>
                Ver los horarios de envío
              </router-link>
            </div>
          </div>
        </div>










        <!-- MEDIO DE VENTA -->
        <!-- <div v-if="checkUser('gestion')">
          <vs-divider class="mt-5 mb-4" />
          <div class="vx-row">
            <h6 class="newUser-subtitle">Medio de venta</h6>
          </div>
          <div class="vx-row" style="margin-left: 15px">
            <vs-radio v-for="SaleType in _localDB.saleTypes" vs-name="saleType"
            v-model="localSelectedSaleTypeID" :vs-value="SaleType.id" class="mr-3 mb-3">
              {{ SaleType.label }}
            </vs-radio>
          </div>
          <vs-divider class="mt-5 mb-4" />
          <div class="vx-row">
            <h6 class="newUser-subtitle">Vendedor</h6>
          </div>
          <div class="vx-row" style="margin-left: 15px">
            <vs-radio v-for="Employee in _allEmployeesAndNone"
            v-model="localSelectedSellerID"
            vs-name="seller"
            :vs-value="Employee.id" class="mr-3 mb-3">
              {{ Employee.name }}
            </vs-radio>
          </div>
        </div> -->










        <!-- SHIPPING INFORMATION -->
        <vs-divider class="mt-5 mb-4" />
        <div v-if="shippingNeeded">

            <div class="vx-row">
              <h6 class="newUser-subtitle">Información de envío</h6>
            </div>

            <div class="vx-row">
            <!-- Street name -->
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Calle *" v-model="NewAddress.streetName" class="w-full"/>
              <!-- <span v-if="Validate.streetName" class="text-danger">Campo obligatorio</span> -->
            </div>
            <!-- Street number -->
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Número de calle *" v-model="NewAddress.streetNumber" class="w-full"/>
              <!-- <span v-if="Validate.streetNumber" class="text-danger">Campo obligatorio</span> -->
            </div>
          </div>

          <div class="vx-row">
            <!-- Floor And Department -->
            <div class="vx-col sm:w-1/2 w-full">
              <vs-input label="Piso / Departamento:" v-model="NewAddress.floorAndDepartment" class="w-full mt-3"/>
            </div>
            <!-- City -->
            <!-- <div class="vx-col sm:w-1/2 w-full">
              <div class="myCitySelectorLabel">Ciudad *</div>
              <v-select class="w-full myCitySelector"label="name" disabled v-model="selectedCityID" :options="_allCities"></v-select>
            </div> -->
            <div class="vx-col sm:w-1/2 w-full">
              <div class="myCitySelectorLabel">Ciudad *</div>
              <div class="similSelectDisabled" @click="$store.dispatch('layout/showLayout', 'citySelector');">
                {{ _City.name }}
                <font-awesome-icon class="chevron" icon="chevron-down"/>
              </div>
            </div>

          </div>

          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input label="Referencias extra" v-model="NewAddress.extraReferences" class="w-full mt-3"/>
            </div>
          </div>
        </div>

        <div class="mt-6 flex" style="justify-content: space-between;">
          <vs-button type="flat" @click.prevent="goPreviousTab()" tabindex="-1">
            <font-awesome-icon icon="angle-left"/>
            Atras
          </vs-button>
          <vs-button @click.prevent="checkNextTab()" class="continueButton">CONTINUAR</vs-button>
        </div>

      <!-- <vs-divider class="mt-5 mb-4" />

      <div class="vx-row">
        <h6 class="newUser-subtitle">Información de cuenta</h6>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full">
          <vs-input label="Email" v-model="NewBuyer.email" class="w-full"/>
        </div>
        <div class="vx-col sm:w-1/2 w-full">
          <vs-input label="Contraseña" v-model="NewBuyer.pass" type="password" class="w-full"/>
        </div>
      </div>

      <div class="ml-auto mt-6 flex" style="justify-content: flex-end;">
        <vs-button @click.prevent="saveNewBuyer(true)">REGISTRARSE Y CONTINUAR</vs-button>
      </div> -->

    </vx-card>

    </div> <!-- New buyer -->
  </div>
</template>

<script>
import vSelect from 'vue-select';

export default {
  components: {
    'v-select': vSelect,
  },
  data() {
    return {
      Address: {
        // streetName: '',
        // streetNumber: '',
        // floorAndDepartment: '',
        // extraReferences: '',
        // cityID: null,
        // city: '',
        streetName: 'Rivadavia',
        streetNumber: '0158',
        floorAndDepartment: '3A',
        extraReferences: 'Columnas blancas en el frente',
        cityID: 3,
        city: 'San Carlos Centro',
      },
      selectedCityID: null,
      addNewAddress: false,
      addNewReceiver: false,
      saleTypeID: 0,
    }; // return DATA
  }, // DATA
  computed: {
    isReceived: {
      get() { return this.Cart.isReceived },
      set(val) {
        this.$store.dispatch('cart/updateIsReceived', val);
      },
    },
    isForMe:{
      get() { return this.Cart.isForMe },
      set(val) {
        this.$store.dispatch('cart/updateIsForMe', val);
      },
    },
    shippingNeeded: {
      get() { return this.Cart.shippingNeeded },
      set(val) {
        this.$store.dispatch('cart/updateShippingNeeded', val);
      },
    },
    localSelectedAddressID: {
      get() { return this.Cart.selectedAddressID; },
      set(val) {
        this.$store.dispatch('cart/updateSelectedAddressID', val);
      },
    },
    localSelectedReceiverID: {
      get() { return this.Cart.selectedReceiverID; },
      set(val) {
        this.$store.dispatch('cart/updateSelectedReceiverID', val);
      },
    },
    localSelectedSellerID: {
      get() { return this.Cart.Seller.id; },
      set(val) {
        this.$store.dispatch('cart/modifySeller', this.getEmployeeInfo(val));
      },
    },
    localSelectedSaleTypeID: {
      get() { return this.Cart.saleTypeID; },
      set(val) {
        this.$store.dispatch('cart/modifySaleTypeID', val);
      },
    },
    localSelectedBuyerEmployeeID: {
      get() { return this.Cart.buyerEmployeeID; },
      set(val) {
        this.$store.dispatch('cart/modifyBuyerEmployeeID', val);
      },
    },
  }, // COMPUTED
  watch: {
    selectedCityID(val) {
      this.NewAddress.cityID = val == null ? null : val.id;
    },
    localSelectedBuyerEmployeeID() {
      this.isReceived = true;
      this.shippingNeeded = false;
    },
  }, // WATCH
  methods: {
    checkNextTab(register = false) {
      if (this.localSelectedBuyerEmployeeID) {
        this.goNextTab();
        return;
      }
      if (this.saveWholeBuyer(register)) {
        this.goNextTab();
      }
    },
    goNextTab() {
      this.$emit('goNextTab');
    },
    goPreviousTab() {
      this.$emit('goPreviousTab');
    },
    saveNewBuyer(register) {

    },
  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

.myCitySelector {
  margin-top: 3px;
}
.myCitySelectorLabel{
  margin-top: 18px;
  font-size: 12px;
  margin-left: 5px;
}
.vs__dropdown-toggle {
  padding: 6px 0 !important;
}
.noHasAccountForm {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
.newUser-subtitle {
  margin-left: 15px;
  margin-bottom: 15px;
}
.shippingMethodItem {
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px solid lightgrey;
  @media (max-width: 374px) {
    margin-left: 0;
    padding-left: 0;
    border: none;
    width: 100%;
  }
}
.paymentInfoText {
  // color: #B8C2CC;
  color: #9CA4AB;
  margin-top: 30px;
}

.similSelectDisabled {
  background-color: #f8f8f8;
  padding: 10px;
  width: 100%;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  .chevron {
    position: absolute;
    right: 10px;
    font-size: 12px;
    top: 12px
  }
}

</style>

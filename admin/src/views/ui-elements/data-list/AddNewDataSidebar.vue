<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>NUEVO PRODUCTO</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
        <!-- name -->
        <vs-input label="Nombre" name="name" v-model="name" class="mt-5 w-full" />
        <!-- Category -->
        <vs-select v-model="category" label="Categoría" class="mt-5 w-full">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in category_choices" />
        </vs-select>
        <!-- Price -->
        <vs-input label="Precio" name="price" v-model="price" class="mt-5 w-full" />
        <!-- Offert -->
        <vs-input label="Oferta" name="offert" v-model="offert" class="mt-5 w-full" />
        <!-- Img -->
        <vs-upload text="Imagenes" class="img-upload" ref="fileUpload" />
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6">Add Data</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: '',
      category: 'audio',
      order_status: 'pending',
      price: 0.0,
      offert: 0.0,

      category_choices: [
        {text:'Alimentos', value:'1'},
        {text:'Bebidas',   value:'2'},
        {text:'Limpieza',  value:'3'},
        {text:'Bazar',     value:'4'}
      ],
      order_status_choices: [
        {text:'Recivida',   value: '1'},
        {text:'En camino',  value: '2'},
        {text:'Cancelado',  value: '3'},
        {text:'Esperandos', value: '4'}
      ],
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if(!val) {
          this.$emit('closeSidebar');
          this.initValues();
        }
      }
    }
  },
  methods: {
    initValues() {
      this.name = '';
      this.category = 'audio';
      this.order_status = 'pending';
      this.price = '';
      this.$refs.fileUpload.srcs = [];
    }
  },
  components: {
    VuePerfectScrollbar,
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
</style>

<template>
  <div class="mainContent">
    <h1 class="tt-title-subpages noborder">CATEGORIAS</h1>
    <vs-row vs-w="12">
      <vs-col v-for="Category in Categories"
      class="categoryItem" vs-type="flex" vs-justify="center" vs-align="center" vs-xl="2" vs-lg="3" vs-sm="4" vs-xs="6">
        <div class="w-full">
          <router-link :to="{ name: 'catalogue', query: { cat: Category.id  } }">
            <vx-card actionable>
              <div slot="no-body">
                <img :src="getImg(`categories/${Category.id}.svg`)" :alt="` ${Category.name} imagen`" class="responsive card-img-top categoryImg">
              </div>
              <h5 class="categoryName">{{ Category.name }}</h5>
              <!-- <div class="flex justify-between flex-wrap">
                <vs-button class="mt-4 shadow-lg w-full">Ver productos</vs-button>
              </div> -->
            </vx-card>
          </router-link>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Categories: [],
    }; // return DATA
  }, // DATA
  created() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      const vm = this;
      this.conectToDB({
        file: 'Categories', action: 'getCategory', params:  { isActive: 1, parentID: 0 },
        success: function(res){
          if(!vm.checkDBResponse(res)) return;
          // console.log('Categories:');
          // console.log(res.data.data);
          vm.Categories = res.data.data;
        }, error: function(error) { vm.myNotify('danger', 'Error', error); },
      });
    },
  },
}
</script>

<style lang="scss" scoped>
  .categoryItem {
    margin-bottom: 20px;
    transition-duration: .5s;
    @media (max-width: 500px) {
      margin-bottom: 15px;
      padding: 0 10px;
    }
    @media (max-width: 400px) {
      margin-bottom: 10px;
      padding: 0 5px;
    }
  }
  .categoryItem:hover {
    transform: scale(1.05);
    // box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  }
  .categoryImg {
    padding: 15px;
  }
  .categoryName {
    background-color: #22223E;
    color: white;
    text-align: center;
    padding: 10px !important;
    border-radius: 10px;
  }
  .mainContent {
    padding: 30px;
    // max-width
    @media (max-width: 1024px) {
      padding-top: 0px;
    }
    @media (max-width: 700px) {
      padding-left:  15px;
      padding-right: 15px;
    }
    @media (max-width: 500px) {
      padding-left:  10px;
      padding-right: 10px;
    }
    @media (max-width: 400px) {
      padding-left:  5px;
      padding-right: 5px;
    }
    // min-width
    @media (min-width: 1400px) {
      padding-left:  100px;
      padding-right: 100px;
    }
    @media (min-width: 1600px) {
      padding-left:  200px;
      padding-right: 200px;
    }
  }
</style>

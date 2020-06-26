<template>

  <div class="layout--main">

    <CitySelector/>

    <movile-sidebar/>

    <main-header :headerCartActive="activeHeaderCart"/>

    <!-- <breadcrumbs/> -->
    <div class="content-area__content">
      <transition mode="out-in">
          <router-view></router-view>
      </transition>
    </div>
    <main-footer :footerCartActive="activeFooterCart"/>
    <!-- BACK TO TOP -->
    <!-- <a href="#" class="tt-back-to-top">IR ARRIBA</a> -->
  </div>
</template>

<script>

// import '@/assets/css/zModulos_sin_uso.css';
// /* 02 */ import '@/assets/css/fontIcons.css';
import /* 03 */ '@/assets/css/externalModules.css';
import /* 04 */ '@/assets/css/main.css';
import /* 03 */ '@/assets/css/header.css';
import /* 04 */ '@/assets/css/footer.css';
import /* 04 */ '@/assets/css/custom.css';

export default {
  components: {
    CitySelector: () => import('@/layouts/components/CitySelector.vue'),
    MainHeader: () => import('@/layouts/components/header/index.vue'),
    MainFooter: () => import('@/layouts/components/Footer.vue'),
    Breadcrumbs: () => import('@/layouts/components/Breadcrumbs.vue'),
    MovileSidebar: () => import('@/layouts/components/MovileSidebar.vue'),
  },
  data:()=>({
  }), // DATA
  mounted() {
    this.setAllEmployees();
    this.setDataDB();
    this.loadCart();
  }, // MOUNTED
  computed:{
    activeFooterCart() {
      if (this.$route.name == 'home' ||this.$route.name == 'cart') return false;
      return true;
    },
    activeHeaderCart(){
      if (this.$route.name == 'home' ||this.$route.name == 'cart') return false;
      return true;
    },
  }, // COMPUTED

  methods: {
    // openCitySelector
    // selectCity
    // setDataDB
    // setAllEmployees
    // setDataDB

    openCitySelector() {
			this.$store.dispatch('layout/showLayout', 'citySelector');
		},

    selectCity() {
      if (this._City.id) {
        this.setUserBasicConfig();
      } else {
        this.openCitySelector();
      }
    },


		setDataDB() {
			// allCities
			let ParamsCities = {
				isActive: 1,
			}
			this.conectToDB({
				file: 'Cities', action: 'getCity', params: ParamsCities,
				success: (res) => {
					if (res.data.error) { console.log(res.data.data); return; }
					let allCities = res.data.data;
					this.$store.dispatch('dataDB/setAllCities', allCities);

					// allBranches
					let ParamsBranches = {
						isActive: 1,
					}
					this.conectToDB({
						file: 'Branches', action: 'getBranch', params: ParamsBranches,
						success: (res) => {
							if (res.data.error) { console.log(res.data.data); return; }
							let allBranches = res.data.data;
							this.$store.dispatch('dataDB/setAllBranches', allBranches);


							this.selectCity();


						}, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
					});


				}, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
			});
		},

		setAllEmployees() {
			this.loadAllEmployees((allEmployees, Employee) => {
				this.$store.dispatch('dataDB/setAllEmployees', allEmployees);
			});
		},

  }, // METHODS
} // export default
</script>

<style lang="scss" scoped>

</style>

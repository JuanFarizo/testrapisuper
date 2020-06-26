<template>
	<div id="app">
		<div v-if="zoomProductID != 0" class="zoomContainer" @click="zoomProductID = 0">
				<img :src="getImgDual(`${zoomProductID}-1`)">
		</div>
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	data() {
		return {
		} // return DATA
	}, // DATA
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val);
    }
  }, // WATCH
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize);
    });
    this.$store.dispatch('updateWindowWidth', window.innerWidth);
  },

  methods: {
		// handleWindowResize
		// toggleClassInBody

    handleWindowResize(event) {
      this.$store.dispatch('updateWindowWidth', event.currentTarget.innerWidth);
    },

    toggleClassInBody(className) {
      if (className == 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
        document.body.classList.add('theme-dark');
      } else if (className == 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-semi-dark');
      } else {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
      }
    },

	}, // METHODS
	computed: {
		zoomProductID :{
			get(){
				return this.$store.state.products.zoomProductID;
			},
			set(val){
				this.$store.dispatch('products/setZoomProductID',val);
			}

		}
	}, //COMPUTED
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

}

</script>

<style lang="scss" scoped>
.zoomContainer{
	position: fixed;
	background-color: rgba(0, 0, 0, 0.65);
	left: center;
	top: center;
	z-index: 999999;
	width: 100%;
	height:100vh;
	display: flex;
	align-items: center;
	}
	img {
		display:block;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		max-height: 100%;
 }

</style>

<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import themeConfig from '@/themeConfig.js';

export default {
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val);
    }
  }, // WATCH

	mounted() {
		this.loadAllCities();
		// this.toggleClassInBody(themeConfig.theme)
		// this.$nextTick(() => {
		// 	window.addEventListener('resize', this.handleWindowResize);
		// });
		// this.$store.dispatch('updateWindowWidth', window.innerWidth);
	}, // MOUNTED

	beforeDestroy() {
		// window.removeEventListener('resize', this.handleWindowResize);
	}, // BEFOREDESTROY

  methods: {
		// loadAllCities
		// handleWindowResize
		// toggleClassInBody
		loadAllCities() {
			let Params = {
				isActive: 1,
			}
			this.conectToDB({
				file: 'Cities', action: 'getCity', params: Params,
				success: (res) => {
					if (res.data.error) { console.log(res.data.data); return; }
					let allCities = res.data.data;
					this.$store.dispatch('dataDB/setAllCities', allCities);
				}, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
			});
		},

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

} // export default

</script>

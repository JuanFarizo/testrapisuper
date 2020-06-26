<template>
  <div class="layout--main" :class="[{'app-page': isAppPage}]">
    <!-- Sidebar -->
    <vx-sidebar :sidebarItems="sidebarItems" :logo="require('@/../../Dual/assets/images/logo/logo.png')" title="" parent=".layout--main" />

    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">

    <div id="content-overlay"></div>
      <div class="content-wrapper">

        <the-navbar :navbarColor="navbarColor" :class="[{'text-white': isNavbarDark && !isThemeDark}, {'text-base': !isNavbarDark && isThemeDark}]" />

        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
            <div class="router-header flex flex-wrap items-center mb-6" v-if="$route.meta.breadcrumb || $route.meta.pageTitle">
              <div class="content-area__heading" :class="{'pr-4 border-0 md:border-r border-t-0 border-b-0 border-l-0 border-solid border-grey-light' : $route.meta.breadcrumb}">
                <h2 class="mb-1">{{ routeTitle }}</h2>
              </div>
              <!-- BREADCRUMB -->
              <vx-breadcrumb class="ml-4 md:block hidden" v-if="$route.meta.breadcrumb" :route="$route" />
              <!-- DROPDOWN -->
              <!-- <vs-dropdown class="ml-auto md:block hidden cursor-pointer" vs-trigger-click>
                <vs-button radius icon="icon-settings" icon-pack="feather"></vs-button>
                <vs-dropdown-menu class="w-32">
                  <vs-dropdown-item>
                    <div @click="$router.push('/pages/profile')" class="flex items-center">
                      <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                      <span>Profile</span>
                    </div>
                  </vs-dropdown-item>

                  <vs-dropdown-item>
                    <div @click="$router.push('/apps/todo')" class="flex items-center">
                      <feather-icon icon="CheckSquareIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                      <span>Tasks</span>
                    </div>
                  </vs-dropdown-item>

                  <vs-dropdown-item>
                    <div @click="$router.push('/apps/email')" class="flex items-center">
                      <feather-icon icon="MailIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                      <span>Inbox</span>
                    </div>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown> -->
            </div>
            </transition>
            <div class="content-area__content">
              <back-to-top bottom="5%" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg" />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <the-footer></the-footer>

      <textarea id="copyText" style="display: none;"></textarea>
    </div>
  </div>
</template>

<script>
import VxSidebar from     '@/layouts/components/vx-sidebar/VxSidebar.vue';
import TheCustomizer from "@/layouts/components/customizer/TheCustomizer.vue";
import TheNavbar from     '@/layouts/components/TheNavbar.vue';
import TheFooter from     '@/layouts/components/TheFooter.vue';
import themeConfig from   '@/themeConfig.js';
import sidebarItemsOptions from  "@/layouts/components/vx-sidebar/sidebarItems.js";
import BackToTop from 'vue-backtotop'
// const VxTour = () => import('@/../../Dual/components/VxTour.vue')

export default {
  data() {
    return {
      sidebarItems: [],
      navbarType: themeConfig.navbarType || 'floating',
      navbarColor: themeConfig.navbarColor || '#fff',
      footerType: themeConfig.footerType || 'static',
      routerTransition: themeConfig.routerTransition || 'none',
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      sidebarItemsOptions: sidebarItemsOptions,
      disableCustomizer: themeConfig.disableCustomizer,
      windowWidth: window.innerWidth, //width of windows
      hideScrollToTop: themeConfig.hideScrollToTop,
    }
  }, // DATA
  components: {
    VxSidebar,
    TheNavbar,
    TheFooter,
    BackToTop,
    TheCustomizer,
  }, // COMPONENTS
  created() {
    this.setSidebarWidth();
    this.updateSidebarItems();
    if (this.navbarColor == "#fff" && this.isThemeDark) {
      this.updateNavbarColor("#10163a")
    } else {
      this.updateNavbarColor(this.navbarColor)
    }
  }, // CREATED
  watch: {
    '$route'() {
        this.routeTitle = this.$route.meta.pageTitle;
      },
      isThemeDark(val) {
      if (this.navbarColor == "#fff" && val) {
        this.updateNavbarColor("#10163a")
      } else {
        this.updateNavbarColor("#fff")
      }
    },
  }, // WATCH
  computed: {
    isAppPage() {
      if(this.$route.path.includes('/apps/')) return true
      else return false
    },
    isThemeDark() { return this.$store.state.theme == 'dark' },
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if(this.sidebarWidth == "default") return "content-area-default"
      else if(this.sidebarWidth == "reduced") return "content-area-reduced"
      else if(this.sidebarWidth) return "content-area-full"
    },
  }, // COMPUTED
  methods: {
    // changeRouteTitle
    // updateNavbarColor
    // handleWindowResize
    // setSidebarWidth
    // updateSidebarItems
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if(val == "#fff") this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar')
        this.disableThemeTour = true;
      }
      else if(this.windowWidth < 1200) {
        this.$store.dispatch('updateSidebarWidth', 'reduced')
      }
      else {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
      }
    },

    updateSidebarItems() {
      if (!this.checkEmployeeIsWorking()) return;
      this.loadEmployee((Employee) => {
        this.sidebarItems = this.sidebarItemsOptions[Employee.roleID];
        this.$store.dispatch('user/setUser', Employee);
        if (Employee.isTester) {
          this.sidebarItems = this.sidebarItemsOptions[0].concat(this.sidebarItems);
        }
      });
    },

  }, // METHODS
} // export defaulta
</script>

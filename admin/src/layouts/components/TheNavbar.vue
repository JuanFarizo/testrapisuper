<template>
<div class="relative">
  <div class="vx-navbar-wrapper">
    <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">
      <!-- SM - OPEN SIDEBAR BUTTON -->
      <feather-icon class="sm:inline-flex xl:hidden cursor-pointer mr-1" icon="MenuIcon" @click.stop="showSidebar"></feather-icon>
      <template v-if="breakpoint != 'md'">
        <!-- STARRED PAGES - FIRST 10 -->
        <ul class="vx-navbar__starred-pages">
          <draggable v-model="starredPagesLimited" :group="{name: 'pinList'}" class="flex cursor-move">
            <li class="starred-page" v-for="page in starredPagesLimited" :key="page.url">
              <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                <feather-icon svgClasses="h-6 w-6" class="p-2 cursor-pointer" :icon="page.labelIcon" @click="$router.push(page.url)"></feather-icon>
              </vx-tooltip>
            </li>
          </draggable>
        </ul>
        <!-- STARRED PAGES MORE -->
        <div class="vx-navbar__starred-pages--more-dropdown" v-if="starredPagesMore.length">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" class="cursor-pointer p-2"></feather-icon>
            <vs-dropdown-menu>
              <ul class="vx-navbar__starred-pages-more--list">
                <draggable v-model="starredPagesMore" :group="{name: 'pinList'}" class="cursor-move">
                  <li class="starred-page--more flex items-center cursor-pointer" v-for="page in starredPagesMore" :key="page.url" @click="$router.push(page.url)">
                    <feather-icon svgClasses="h-5 w-5" class="ml-2 mr-1" :icon="page.labelIcon"></feather-icon>
                    <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                  </li>
                </draggable>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </template>
      <vs-spacer></vs-spacer>

      <!-- NOTIFICATIONS -->
      <!-- <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <feather-icon icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" :badge="unreadNotifications.length"></feather-icon>
        <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">

          <div class="notification-top text-center p-5 bg-primary text-white">
            <h3 class="text-white">{{ unreadNotifications.length }} Nuevas</h3>
            <p class="opacity-75">Notificaciones</p>
          </div>

          <VuePerfectScrollbar ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings">
            <ul class="bordered-items">
              <li v-for="ntf in unreadNotifications" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer">
                <div class="flex items-start">
                  <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
                  <div class="mx-2">
                    <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>
                    <small>{{ ntf.msg }}</small>
                  </div>
                </div>
                <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
              </li>
            </ul>
          </VuePerfectScrollbar>
          <div class="
            checkout-footer
            fixed
            bottom-0
            rounded-b-lg
            text-primary
            w-full
            p-2
            font-semibold
            text-center
            border
            border-b-0
            border-l-0
            border-r-0
            border-solid
            d-theme-border-grey-light
            cursor-pointer">
            <span>Ver todas las noticicaciones</span>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown> -->
      <!-- USER META -->
      <div class="the-navbar__user-meta flex items-center">
        <div class="text-right leading-tight hidden sm:block">
          <p class="font-semibold">{{ User.nick || User.user }}</p>
          <small>{{ User.role }}</small> -
          <small>{{ _Branch.name }}</small>
        </div>
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <!-- user img -->
          <div class="con-img ml-3">
            <img
              v-if="activeUserImg.startsWith('http')"
              key="onlineImg"
              :src="activeUserImg"
              alt="user-img"
              width="40"
              height="40"
              class="rounded-full shadow-md cursor-pointer block" />
            <img
              v-else
              key="localImg"
              :src="require(`@/../../Dual/assets/images/portrait/small/${activeUserImg}`)"
              alt="user-img"
              width="40"
              height="40"
              class="rounded-full shadow-md cursor-pointer block" />
          </div>
          <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem">
              <!-- profile -->
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push({name: 'employees'})">
                <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Perfil</span>
              </li>
              <!-- email -->
              <!-- <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push('/apps/email')">
                <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Email</span>
              </li> -->
              <!-- task -->
              <!-- <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push('/apps/todo')">
                <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Tareas</span>
              </li> -->
              <!-- chat -->
              <!-- <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push('/apps/chat')">
                <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Chat</span>
              </li> -->
              <!-- divider -->
              <vs-divider class="m-1"></vs-divider>
              <!-- log out -->
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="logout()">
                <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"/>
                <span class="ml-2">Salir</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </vs-navbar>
  </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import VxAutoSuggest from '@/../../Dual/components/vx-auto-suggest/VxAutoSuggest.vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'

export default {
    name: "the-navbar",
    props: {
        navbarColor: {
            type: String,
            default: "#fff",
        },
    },
    data() {
        return {
            starredPagesLimited: [],
            starredPagesMore: 0,
            navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
            showFullSearch: false,
            unreadNotifications: [
                { index: 0, title: 'New Message', msg: 'Are your going to meet me tonight?', icon: 'MessageSquareIcon', time: this.randomDate({sec: 10}), category: 'primary' },
                { index: 1, title: 'New Order Recieved', msg: 'You got new order of goods.', icon: 'PackageIcon', time: this.randomDate({sec: 40}), category: 'success' },
                { index: 2, title: 'Server Limit Reached!', msg: 'Server have 99% CPU usage.', icon: 'AlertOctagonIcon', time: this.randomDate({min: 1}), category: 'danger' },
                { index: 3, title: 'New Mail From Peter', msg: 'Cake sesame snaps cupcake', icon: 'MailIcon', time: this.randomDate({min: 6}), category: 'primary' },
                { index: 4, title: 'Bruce\'s Party', msg: 'Chocolate cake oat cake tiramisu', icon: 'CalendarIcon', time: this.randomDate({hr: 2}), category: 'warning' },
            ],
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            showBookmarkPagesDropdown: false,
        }
    },
    watch: {
        '$route'() {
            if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
        }
    },
    computed: {
      User() {
        return this.getUser();
      },
        // HELPER
        sidebarWidth() {
            return this.$store.state.sidebarWidth;
        },
        breakpoint() {
            return this.$store.state.breakpoint;
        },

        // NAVBAR STYLE
        classObj() {
            if (this.sidebarWidth == "default") return "navbar-default"
            else if (this.sidebarWidth == "reduced") return "navbar-reduced"
            else if (this.sidebarWidth) return "navbar-full"
        },
        // PROFILE
        activeUserImg() {
          return this.getImg(`employees/${this.User.id}.png`);
          return 'isologo.png'
        }
    },
    methods: {
        showSidebar() {
            this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
        },
        selected(item) {
            this.$router.push(item.url)
        },
        actionClicked(item) {
            // e.stopPropogation();
            this.$store.dispatch('updateStarredPage', { index: item.index, val: !item.highlightAction });
        },
        elapsedTime(startTime) {
            let x = new Date(startTime);
            let now = new Date();
            var timeDiff = now - x;
            timeDiff /= 1000;

            var seconds = Math.round(timeDiff);
            timeDiff = Math.floor(timeDiff / 60);

            var minutes = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);

            var hours = Math.round(timeDiff % 24);
            timeDiff = Math.floor(timeDiff / 24);

            var days = Math.round(timeDiff % 365);
            timeDiff = Math.floor(timeDiff / 365);

            var years = timeDiff;

            if (years > 0) {
                return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
            } else if (days > 0) {
                return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
            } else if (hours > 0) {
                return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
            } else if (minutes > 0) {
                return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
            } else if (seconds > 0) {
                return seconds + (seconds > 1 ? ' sec ago' : 'just now');
            }

            return 'Just Now'
        },
        outside: function() {
            this.showBookmarkPagesDropdown = false
        },

        // CART DROPDOWN
        removeItemFromCart(item) {
            this.$store.dispatch('eCommerce/toggleItemInCart', item)
        },

        // Method for creating dummy notification time
        randomDate({hr, min, sec}) {
          let date = new Date()

          if(hr) date.setHours(date.getHours() - hr)
          if(min) date.setMinutes(date.getMinutes() - min)
          if(sec) date.setSeconds(date.getSeconds() - sec)

          return date
        }
    },
    directives: {
        'click-outside': {
            bind: function(el, binding) {
                const bubble = binding.modifiers.bubble
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                }
                el.__vueClickOutside__ = handler
                document.addEventListener('click', handler)
            },

            unbind: function(el) {
                document.removeEventListener('click', el.__vueClickOutside__)
                el.__vueClickOutside__ = null

            }
        }
    },
    components: {
        VxAutoSuggest,
        VuePerfectScrollbar,
        draggable
    },
}
</script>

import navbarSearchAndPinList from '@/../../Dual/layouts/components/navbarSearchAndPinList'
import colorsConfig from '@/../../Dual/colorsConfig.js'

const state = {
    isSidebarActive: true,
    breakpoint: null,
    sidebarWidth: "default",
    bodyOverlay: false,
    sidebarItemsMin: false,
    navbarSearchAndPinList: navbarSearchAndPinList,
    AppActiveUser: {
        id: 0,
        name: 'John Doe',
        about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
        img: 'avatar-s-11.png',
        status: 'online',
    },

    themePrimaryColor: colorsConfig.primary,

    starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),
    userRole: null,

    // Can be used to get current window with
    // Note: Above breakpoint state is for internal use of sidebar component
    windowWidth: null,
}

export default state

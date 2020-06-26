import Vue from 'vue'
import VxCard  from './components/vx-card/VxCard.vue'
import VxList  from './components/vx-list/VxList.vue'
import FeatherIcon  from './components/FeatherIcon.vue'
import VxInputGroup  from './components/vx-input-group/VxInputGroup.vue'
import PromptButtons  from './components/PromptButtons.vue'
import MonthSelector  from './components/MonthSelector.vue'
import UploadPhoto  from './components/UploadPhoto.vue'
UploadPhoto
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(VxInputGroup.name, VxInputGroup)
Vue.component(PromptButtons.name, PromptButtons)
Vue.component(MonthSelector.name, MonthSelector)
Vue.component(UploadPhoto.name, UploadPhoto)


// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    }),
  },
  OpenIndicator: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    }),
  },
});

Vue.component(vSelect)

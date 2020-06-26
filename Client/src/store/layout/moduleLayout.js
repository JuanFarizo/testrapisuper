import state from './moduleLayoutState.js'
import mutations from './moduleLayoutMutations.js'
import actions from './moduleLayoutActions.js'
import getters from './moduleLayoutGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import task from './modules/task'
import application from './modules/application'
import label from './modules/label'
import checklistItem from './modules/checklistItem'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: false,
    modules: {
        user,
        application,
        task,
        label,
        checklistItem
    }
})
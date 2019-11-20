import axios from 'axios'
import Vue from 'vue'

const state = {
    checklist: []
}

const mutations = {
    'UPDATE_CHECKLIST' (state, data) {
        var index = state.checklist.findIndex(e => e.id === data.id)
        Vue.set(state.checklist, index, data)
    },
    'DELETE_CHECKLISTITEM' (state, data) {
        var index = state.checklist.findIndex(e => e.id === data.id)
        Vue.delete(state.checklist, index)
    },    
    'CREATE_CHECKLIST' (state, data) {
        state.checklist.push(data)
    },    
    'LOAD_CHECKLIST' (state, data) {
        state.checklist = data
    }
}

const actions = {
    // eslint-disable-next-line    
    async updateChecklistItem ({ commit }, checklist_item) {
        const clResult = await axios.post(`/checklistitems/update/${checklist_item.id}`, checklist_item)
        if(clResult.data.status == 200)
        {
            commit('UPDATE_CHECKLIST', clResult.data.result)
            return { success: true }
        }
        // eslint-disable-next-line
        console.log("Error updating checklist", clResult.data.error)
        commit('application/ERROR', 'Error updating checklist')
        return { success: false }  
    },
    async deleteChecklistItem ({ commit }, id) {
        const clResult = await axios.post(`/checklistitems/delete/${id}`)
        if(clResult.data.status == 200)
        {
            commit('DELETE_CHECKLISTITEM', id)
            return { success: true }
        }
        // eslint-disable-next-line
        console.log("Error deleting checklist", clResult.data.error)
        commit('application/ERROR', 'Error deleting checklist')
        return { success: false }  
    },    
    async createChecklistItem ({ commit }, data) {
        const clResult = await axios.post(`/checklistitems/create/${data.id}`, data.checklist_item)
        if(clResult.data.status == 200)
        {
            commit('CREATE_CHECKLIST', clResult.data.result)
            return { success: true }
        }
        // eslint-disable-next-line
        console.log("Error creating checklist", clResult.data.error)
        commit('application/ERROR', 'Error creating checklist')
        return { success: false }  
    },    
    async loadChecklist ({ commit }, id) {
        const clResult = await axios.get(`/checklistitems/${id}`)
        if(clResult.data.status == 200)
        {
            commit('LOAD_CHECKLIST', clResult.data.result)
            return { success: true }
        }
        // eslint-disable-next-line
        console.log("Error loading checklist")
        commit('application/ERROR', 'Error loading checklist')
        return { success: false }  
    }
}

const getters = {
    getChecklist (state) {
        return state.checklist
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
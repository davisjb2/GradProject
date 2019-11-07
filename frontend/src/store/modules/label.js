import axios from 'axios'

const state = {
    labels: []
}

const mutations = {
    'UPDATE_LABELS' (state, data) {
        var index = state.labels.findIndex(e => e.id === data.id)
        state.labels[index] = data
    },
    'LOAD_LABELS' (state, data) {
        state.labels = data
    }
}

const actions = {
    // eslint-disable-next-line    
    async updateLabel ({ commit }, label) {
        const labelResult = await axios.post(`/labels/update/${label.id}`, label)
        if(labelResult.data.status == 200)
        {
            commit('UPDATE_LABEL', labelResult.data.result)
            return { success: true }
        }
        // eslint-disable-next-line
        console.log("Error updating label", labelResult.data.error)
        commit('application/ERROR', 'Error updating label')
        return { success: false }  
    },
    async loadLabels ({ commit }) {
        const labelsResult = await axios.get('/labels')
        if(labelsResult.data.status == 200)
        {
            commit('LOAD_LABELS', labelsResult.data.result)
            return { success: true }
        }
        // eslint-disable-next-line
        console.log("Error loading labels")
        commit('application/ERROR', 'Error loading labels')
        return { success: false }  
    }
}

const getters = {
    getLabels (state) {
        return state.labels
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
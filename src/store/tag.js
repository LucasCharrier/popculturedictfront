import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        async getCollection (_, credentials) {
            let response = await axios.get('tags', { params: credentials})
            return response
        },
    }
}
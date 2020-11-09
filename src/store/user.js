import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        async like (_, credentials) {
            let response = await axios.post(`definitions/${credentials.id}/like`);
            return response;
        },
        async dislike (_, credentials) {
            let response = await axios.post(`definitions/${credentials.id}/dislike`);
            return response;
        },
    }
}
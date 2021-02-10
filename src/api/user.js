import axios from 'axios'
export default {
    get(id = null) {
        if (id) {
            return axios.get(`http://localhost:8000/api/0.1/users/${id}`)
        }
        return axios.get("http://localhost:8000/api/0.1/users/")
    },

    post(data) {
        return axios.post(
            "http://localhost:8000/api/0.1/users/", data)
    },

    put({ data, id }) {
        return axios.put(
            `http://localhost:8000/api/0.1/users/${id}/`, data)
    },

    delete(id) {
        return axios.delete(
            `http://localhost:8000/api/0.1/users/${id}/`)
    },
};
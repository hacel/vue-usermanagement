import axios from 'axios'
export default {
    async Get() {
        return await axios.get()
    },

    async Post(data) {
        return await axios.post(
            "http://localhost:8000/api/0.1/users/", data)
    },

    async Put(data, id) {
        return await axios.put(
            `http://localhost:8000/api/0.1/users/${id}/`, data)
    },

    async Delete(id) {
        return await axios.delete(
            `http://localhost:8000/api/0.1/users/${id}/`)
    },
};
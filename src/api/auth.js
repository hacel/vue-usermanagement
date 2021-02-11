import axios from 'axios'
export default {
    get_token(data) {
        return axios.post('http://localhost:8000/api/0.1/token-auth/', data)
    }
};
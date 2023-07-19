import axios from "axios";
import { getEnvVariables } from '../helpers/getEnvVariables'

//const API_URL = "http://localhost:9090/api/"
const { VITE_API_URL } = getEnvVariables()
const API_URL = VITE_API_URL

const userAPI = axios.create({
    baseURL: API_URL
})

userAPI.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config
})

export default userAPI

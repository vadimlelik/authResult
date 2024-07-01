import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/";


const http = axios.create({
    baseURL,
})

// http.interceptors.request.use(config => {})

const httpClient = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}


export default httpClient;
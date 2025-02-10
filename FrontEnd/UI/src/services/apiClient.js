import axios from "axios";


//creation of an instance of axios with default settings

const apiClient = axios.create({
    baseUrl :'http://localhost:8080/api',
    headers:{
        'Content-Type':'application/json',
    }
});


export default apiClient;
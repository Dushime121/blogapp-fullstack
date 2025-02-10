import apiClient from "./apiClient"

// Register a new user
export const register = async (userData) => {
    try {
        const response = await apiClient.post('http://localhost:8080/api/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user: ', error);
        throw error;
    }
}

// // Authenticate a user
// export const login = async (credentials) => {
//     try {
//         const response = await apiClient.post('http://localhost:8080/api/auth/login', credentials);
    
//         return response.data;
//     } catch (error) {
//         console.error('Error logging in: ', error);
//         throw error;
//     }
// }

// Authenticate a user
export const login = async (credentials) => {
    try {
        const response = await apiClient.post('http://localhost:8080/api/auth/login', credentials);
        
        // Save user ID and username in localStorage
        localStorage.setItem("user_id", response.data.id);
        console.log("user id from auth: ", localStorage.getItem("user_id"))
        localStorage.setItem("username", response.data.username);
        
        return response.data;
    } catch (error) {
        console.error('Error logging in: ', error);
        throw error;
    }
}

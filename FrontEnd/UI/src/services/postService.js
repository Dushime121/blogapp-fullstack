import apiClient from "./apiClient";

//fetching all blog posts

export const getAllPosts =async ()=>{
 try{
    const response = await apiClient.get('http://localhost:8080/api/posts');
    return response.data;
 } catch(error){
    console.error('Error fetching posts: ', error);
    throw error;
 };

};



//fetching a single post by ID

export const getPostById = async (id)=>{

try{
    const response = await apiClient.get(`http://localhost:8080/api/posts/${id}`);
    return response.data;
} catch (error){
    console.error('Error fetching post by ID: ', error);
    throw error;
};

};



//creating a new blog


// export const createPost = async (postData) =>{
//     try{
//         const response = await apiClient.post('http://localhost:8080/api/posts', postData);
//         return response.data;
//     }catch (error){
//         console.error('Error creating post:', error);
//         throw error;
//     };
// };


// export const createPost = async (postData) => {
//     try {
//         // Retrieve userId from localStorage (assuming it's saved after sign-in or sign-up)
//         const userId = localStorage.getItem("user_id");
//         if (!userId) {
//             throw new Error("User is not logged in");
//         }

//         // Add userId to the post data
//         const postWithUserId = {
//             ...postData,  // Keep the existing post data
//             user: { id: userId },  // Attach the userId
//         };

//         const response = await apiClient.post('http://localhost:8080/api/posts', postWithUserId);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating post:', error);
//         throw error;
//     }
// };
export const createPost = async (postData) => {
    try {
        // Retrieve userId from localStorage
        const userId = localStorage.getItem("user_id");
        console.log("User id from postService: ",userId)
        if (!userId) {
            throw new Error("User is not logged in");
        }

        // Add userId to the post data
        const postWithUserId = {
            ...postData, // Keep existing post data (title, content)
            userId: userId // Attach userId
        };

        const response = await apiClient.post('http://localhost:8080/api/posts', postWithUserId);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};


//Updating a blog

export const updatePost = async (id, postData) =>{
    try{
        const response = await apiClient.put(`http://localhost:8080/api/posts/${id}`, postData);
        return response.data;
    }catch(error){
        console.error('Error updating post:', error);
        throw error;
    }
};


//Delete a blog post

export const deletePost = async (id) =>{
    try{
        const response = await apiClient.delete(`http://localhost:8080/api/posts/${id}`);
        return response.data;

    }catch(error){
        console.error('Error deleting post: ', error);
        throw error;
    }
};
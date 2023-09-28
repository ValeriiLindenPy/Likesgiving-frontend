import api from "@/app/api/auth/baseaxios";




export const getPosts = async (postType, token, pageNumber) => {
    try {
        const response = await api.get(`posts/v1/post/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
            params: { post_type: postType, page: pageNumber },

        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response.status)
        }
    } catch (error) {
        console.log(error)
    }
};

import api from "@/app/api/auth/baseaxios";





export const getPosts = async (postType, token, pageNumber, author = null) => {
    try {

        let url = `posts/v1/posts/?post_type=${postType}&page=${pageNumber}`

        if (author !== null) {
            url = `posts/v1/posts/?author=${author}&post_type=${postType}&page=${pageNumber}`
        }

        const response = await api.get(url, {
            headers: {
                Authorization: `Token ${token}`,
            },
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

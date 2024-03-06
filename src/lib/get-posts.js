

export const getPosts = async (postType, token, pageNumber, author = null) => {
    try {
        let url = `https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/posts/?post_type=${postType}&page=${pageNumber}`;

        if (author !== null) {
            url = `https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/posts/?author=${author}&post_type=${postType}&page=${pageNumber}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {

        }
    } catch (error) {

    }
};

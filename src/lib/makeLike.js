export const makeLike = async (id, token) => {
    try {
        const response = await fetch(`https://ihl-project-606adf7a8500.herokuapp.com/posts/add-like/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to add like');
        }
    } catch (error) {
        throw error;
    }
};

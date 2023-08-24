import api from "./baseaxios";


export const handleLogin = async (email, password) => {
    try {
        const response = await api.get('/auth/user', { params: { email, password } });
        console.log(response.data);
        const token = response.data.token;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
      
      // Redirect or perform other actions after successful login
    } catch (error) {
      console.log(error)
    }
  };
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ihl-project-606adf7a8500.herokuapp.com/',
});

export default api;
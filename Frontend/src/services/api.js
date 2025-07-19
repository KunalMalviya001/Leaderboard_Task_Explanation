import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://leaderboard-backend-5xvj.onrender.com', // Update this if deployed
});

export default instance;

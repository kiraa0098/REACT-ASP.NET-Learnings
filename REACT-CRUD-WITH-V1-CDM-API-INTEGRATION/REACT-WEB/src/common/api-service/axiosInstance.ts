// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\common\api-service\axiosInstance.ts

import axios from 'axios';

const API_BASE_URL = 'https://localhost:7082'; // Assuming backend runs on this port

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

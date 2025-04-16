// src/axios.js

import axios from 'axios';

// Set the global base URL for all requests
axios.defaults.baseURL = 'http://localhost:3000'; // Replace with your actual API base URL
axios.defaults.headers['Content-Type'] = 'application/json';

export default axios; // Export the Axios instance to use throughout the app

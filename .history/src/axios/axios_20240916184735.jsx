
import axios from 'axios';

export const baseURL =  process.env.REACT_APP_API_URL;
export const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json',
    },
});




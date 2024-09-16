
import axios from 'axios';

export const baseURL =  
export const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json',
    },
});




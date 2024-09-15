
import axios from 'axios';

export const baseURL =  'https://test.create.diagnal.com'
export const client = axios.create({
    baseURL: 'https://test.create.diagnal.com',
    headers: {
        'Accept': 'application/json',
    },
});




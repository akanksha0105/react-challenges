
import axios from 'axios';


export const client = axios.create({
    baseURL: 'https://test.create.diagnal.com',
    headers: {
        'Accept': 'application/json',
    },
});




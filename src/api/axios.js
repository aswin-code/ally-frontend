import axios from 'axios';
const BASE_URL = `https://ultramarine-drill-vest.cyclic.app/api/v1`
export default axios.create({
    baseURL: BASE_URL, headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const axiosMutation = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'multipart/formdata' },
    withCredentials: true
})


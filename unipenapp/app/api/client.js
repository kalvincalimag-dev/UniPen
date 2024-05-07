import axios from 'axios'
// Revise through ipconfig IPv4 Address when changing networks 
// const client = axios.create({baseURL: 'http://192.168.100.1:4848/api'});
const client = axios.create({baseURL: 'http://192.168.56.1:4848/api'});

export default client;



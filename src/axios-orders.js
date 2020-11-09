import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://react-course-f14f0.firebaseio.com/'
});

export default orderInstance;


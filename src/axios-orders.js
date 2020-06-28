import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-df70a.firebaseio.com/'
})

export default instance;
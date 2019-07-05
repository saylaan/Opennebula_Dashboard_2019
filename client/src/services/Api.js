import axios from 'axios'
import store from '@/store/store'

export default () => { // give back a connector
  return axios.create({ // axios obj that point to the URL
    // baseURL: 'http://portal-vlab:80/',
    baseURL: 'https://portal-vlab.ale-aapp.com:443/',
    // baseURL: 'http://localhost:80/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
} // Heading our differents end point

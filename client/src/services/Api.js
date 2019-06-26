import axios from 'axios'
import store from '@/store/store'

export default () => { // give back a connector
  return axios.create({ // axios obj that point to the URL
    baseURL: 'http://localhost:3000/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
} // Heading our differents end point

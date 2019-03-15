import axios from 'axios'

export default () => { // give back a connector
  return axios.create({ // axios obj that point to the URL
    baseURL: 'http://localhost:8081/'
  })
} // Heading our differents end point

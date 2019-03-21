import Api from '@/services/Api'

export default { // Hitting the end point register
  getAllVlabs () {
    return Api().get('vlabs')
  },
  post (vlab) {
    return Api().post('vlabs', vlab)
  },
  getVlab (vlabId) {
    return Api().get(`vlabs/${vlabId}`)
  }
}

// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })

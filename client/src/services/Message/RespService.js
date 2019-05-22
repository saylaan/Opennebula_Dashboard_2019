import Api from '@/services/Api'

export default { // Hitting the end point register
  index() {
    return Api().get('resp')
  },
  get(respId) {
    return Api().get(`resp/${respId}`)
  },
  post(resp) {
    return Api().post(`resp`, resp)
  },
  delete(respId) {
    return Api().delete(`resp/${respId}`)
  }
}

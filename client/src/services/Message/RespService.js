import Api from '@/services/Api'

export default { // Hitting the end point register
  index() {
    return Api().get('resp')
  },
  get(respId) {
    return Api().get(`resp/${respId}`)
  },
  post(respId, resp) {
    return Api().post(`resp/${respId}`, resp)
  },
  delete(respId) {
    return Api().delete(`resp/${respId}`)
  }
}

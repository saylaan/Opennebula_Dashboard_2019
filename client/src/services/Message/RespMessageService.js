import Api from '@/services/Api'

export default { // Hitting the end point register
  index(respId) {
    return Api().get('respsMessage', {
      params: respId
    })
  },
  post(respMessage) {
    return Api().post('respsMessage', respMessage)
  },
  delete(respMessageId) {
    return Api().delete(`respsMessage/${respMessageId}`)
  }
}

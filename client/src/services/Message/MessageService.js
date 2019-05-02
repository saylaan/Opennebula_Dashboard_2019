import Api from '@/services/Api'

export default { // Hitting the end point register
  index(value) {
    return Api().get('dashboard', {
      params: {
        value: value
      }
    })
  },
  getMessage(messageId) {
    return Api().get(`message/${messageId}`)
  },
  post(messageId, msg) {
    return Api().post(`message/${messageId}`, msg)
  },
  deleteMsg(messageuserId) {
    return Api().delete(`dashboard/${messageuserId}`)
  }
}

import Api from '@/services/Api'

export default { // Hitting the end point register
  post(message) {
    return Api().post('message', message)
  },
  deleteMsgUser(messageuserId) {
    return Api().delete(`dashboard/${messageuserId}`)
  },
  deleteMsgFaq(messageId) {
    return Api().delete(`dashboard/${messageId}`)
  }
}

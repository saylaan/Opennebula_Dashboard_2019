import Api from '@/services/Api'

export default { // Hitting the end point register
  index(messageId) {
    return Api().get('messagesUser', {
      params: messageId
    })
  },
  post(messageUser) {
    return Api().post('messagesUser', messageUser)
  },
  delete(messageUserId) {
    return Api().delete(`messagesUser/${messageUserId}`)
  },
  delAdmin(messageUserId) {
    return Api().delete(`dashboard/${messageUserId}`)
  }
}

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
  postNewMsg(msg) {
    return Api().post('message', msg)
  },
  deleteMsgPost(messageId) {
    return Api().delete(`message/${messageId}`)
  },
  deleteMessage(messageId) {
    return Api().delete('dashboard', {
      params: {
        messageId: messageId
      }
    })
  }
}

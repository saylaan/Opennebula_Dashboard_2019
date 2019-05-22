import Api from '@/services/Api'

export default { // Hitting the end point register
  index(MessageId) {
    return Api().get('respsMessage', {
      params: MessageId
    })
  },
  post(messageId, respId) {
    return Api().post('respsMessage', {
      MessageId: messageId,
      RespId: respId
    })
  },
  delete(respMessageId) {
    return Api().delete(`respsMessage/${respMessageId}`)
  }
}

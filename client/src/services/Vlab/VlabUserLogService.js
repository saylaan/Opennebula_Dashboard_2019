import Api from '@/services/Api'

export default { // Hitting the end point register
  index(userId) {
    return Api().get('VlabUserLogs', {
      params: userId
    })
  },
  post(userId) {
    return Api().post('VlabUserLogs', userId)
  }
}

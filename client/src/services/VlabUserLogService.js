import Api from '@/services/Api'

export default { // Hitting the end point register
  index (log) {
    return Api().get('VlabUserLogs', {
      params: log
    })
  },
  post (log) {
    return Api().post('VlabUserLogs', log)
  }
}

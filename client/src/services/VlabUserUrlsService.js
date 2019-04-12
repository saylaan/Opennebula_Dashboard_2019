import Api from '@/services/Api'

export default { // Hitting the end point register
  getIndex(vlabuser) {
    return Api().get('VlabUsersUrls', {
      params: vlabuser
    })
  },
  post(vlabuser) {
    return Api().post('VlabUsersUrls', vlabuser)
  },
  delete(vlabuserId) {
    return Api().delete(`VlabUsersUrls/${vlabuserId}`)
  }
}

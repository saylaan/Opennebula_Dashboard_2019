import Api from '@/services/Api'

export default { // Hitting the end point register
  getVlabUser (vlabuser) {
    return Api().get('VlabUsers', {
      params: vlabuser
    })
  },
  post (vlabuser) {
    return Api().post('VlabUsers', vlabuser)
  },
  delete (vlabuserId) {
    return Api().delete(`VlabUsers/${vlabuserId}`)
  }
}

import Api from '@/services/Api'

export default { // Hitting the end point register
  index(vlabId) {
    return Api().get('vlabUsers', {
      params: {
        VlabId: vlabId
      }
    })
  },
  getVlabUser(vlabId) {
    return Api().get(`vlabUsers/${vlabId}`)
  },
  post(vlabuser) {
    return Api().post('vlabUsers', vlabuser)
  },
  delete(vlabuserId) {
    return Api().delete(`vlabUsers/${vlabuserId}`)
  }
}

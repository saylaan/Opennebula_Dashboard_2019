import Api from '@/services/Api'

export default { // Hitting the end point register
  getVlabUsers(vlabId) {
    return Api().get('vlabUsers', {
      params: vlabId
    })
  },
  post(vlabuser) {
    return Api().post('vlabUsers', vlabuser)
  },
  delete(vlabuserId) {
    return Api().delete(`vlabUsers/${vlabuserId}`)
  }
}

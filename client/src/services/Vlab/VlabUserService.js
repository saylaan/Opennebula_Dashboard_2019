import Api from '@/services/Api'

export default { // Hitting the end point register
  getVlabUsers(vlabuser) {
    return Api().get('vlabUsers', {
      params: vlabuser
    })
  },
  post(vlabuser) {
    return Api().post('vlabUsers', vlabuser)
  },
  delete(vlabuserId) {
    return Api().delete(`vlabUsers/${vlabuserId}`)
  }
}

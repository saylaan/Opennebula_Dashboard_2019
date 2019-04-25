import Api from '@/services/Api'

export default { // Hitting the end point register
  index(urluser) {
    return Api().get('urlsUser', {
      params: urluser
    })
  },
  post(urluser) {
    return Api().post('urlsUser', urluser)
  },
  delete(urluserId) {
    return Api().delete(`urlsUser/${urluserId}`)
  }
}

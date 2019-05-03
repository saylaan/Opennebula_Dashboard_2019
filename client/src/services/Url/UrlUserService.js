import Api from '@/services/Api'

export default {
  index(urlId) {
    return Api().get('urlsUser', {
      params: urlId
    })
  },
  post(urlUser) {
    return Api().post('urlsUser', urlUser)
  },
  delete(urlUserId) {
    return Api().delete(`urlsUser/${urlUserId}`)
  }
}

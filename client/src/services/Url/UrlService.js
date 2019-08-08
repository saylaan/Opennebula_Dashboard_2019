import Api from '@/services/Api'

export default {
  index() {
    return Api().get('url')
  },
  getUrl(urlId) {
    return Api().get(`url/${urlId}`)
  },
  post(url) {
    return Api().post('url', url)
  },
  delete(urlId) {
    return Api().delete(`url/${urlId}`)
  },
  put(urlId) {
    return Api().put(`url/${urlId}`)
  },
  changePwd(urlId) {
    console.log(urlId)
    return Api().put(`vlab/${urlId}`)
  }
}

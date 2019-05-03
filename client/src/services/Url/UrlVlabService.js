import Api from '@/services/Api'

export default {
  index(urlId) {
    return Api().get('urlsVlab', {
      params: urlId
    })
  },
  post(urlVlab) {
    return Api().post('urlsVlab', urlVlab)
  },
  delete(urlVlabId) {
    return Api().delete(`urlsVlab/${urlVlabId}`)
  }
}

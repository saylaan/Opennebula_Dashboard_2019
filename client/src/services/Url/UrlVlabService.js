import Api from '@/services/Api'

export default {
  index(VlabId) {
    return Api().get('urlsVlab', {
      params: VlabId
    })
  },
  post(urlId, vlabId) {
    return Api().post('urlsVlab', {
      VlabId: vlabId,
      UrlId: urlId
    })
  },
  delete(urlVlabId) {
    return Api().delete(`urlsVlab/${urlVlabId}`)
  }
}

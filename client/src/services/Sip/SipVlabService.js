import Api from '@/services/Api'

export default {
  index(VlabId) {
    return Api().get('sipsVlab', {
      params: VlabId
    })
  },
  post(sipId, vlabId) {
    return Api().post('sipsVlab', {
      VlabId: vlabId,
      SipId: sipId
    })
  },
  delete(sipVlabId) {
    return Api().delete(`sipsVlab/${sipVlabId}`)
  }
}

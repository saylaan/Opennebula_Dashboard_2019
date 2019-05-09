import Api from '@/services/Api'

export default {
  index(VlabId) {
    return Api().get('vmsVlab', {
      params: VlabId
    })
  },
  post(vmId, vlabId) {
    return Api().post('vmsVlab', {
      VlabId: vlabId,
      VmId: vmId
    })
  },
  delete(vmVlabId) {
    return Api().delete(`vmsVlab/${vmVlabId}`)
  }
}

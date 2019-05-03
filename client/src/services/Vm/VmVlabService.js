import Api from '@/services/Api'

export default {
  index(vmId) {
    return Api().get('vmsVlab', {
      params: vmId
    })
  },
  post(vmVlab) {
    return Api().post('vmsVlab', vmVlab)
  },
  delete(vmVlabId) {
    return Api().delete(`vmsVlab/${vmVlabId}`)
  }
}

import Api from '@/services/Api'

export default {
  index() {
    return Api().get('vm')
  },
  getVm(vmId) {
    return Api().get(`vm/${vmId}`)
  },
  post(vm) {
    return Api().post('vm', vm)
  },
  delete(vmId) {
    return Api().delete(`vm/${vmId}`)
  },
  put(vmId) {
    return Api().put(`vm/${vmId}`)
  }
}

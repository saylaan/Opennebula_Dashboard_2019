import Api from '@/services/Api'

export default {
  index(vmId) {
    return Api().get('vmsUser', {
      params: vmId
    })
  },
  post(vmUser) {
    return Api().post('vmsUser', vmUser)
  },
  delete(vmUserId) {
    return Api().delete(`vmsUser/${vmUserId}`)
  }
}

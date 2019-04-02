import Api from '@/services/Api'

export default { // Hitting the end point register
  getAllVlabs (search) {
    return Api().get('vlabs', {
      params: {
        search: search
      }
    })
  },
  post (vlab) {
    return Api().post('vlabs', vlab)
  },
  getVlab (vlabId) {
    return Api().get(`vlabs/${vlabId}`)
  },
  put (vlab) {
    return Api().put(`vlabs/${vlab.id}`)
  }
}

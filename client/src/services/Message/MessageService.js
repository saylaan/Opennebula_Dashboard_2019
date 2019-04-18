import Api from '@/services/Api'

export default { // Hitting the end point register
  index(dashboard) {
    return Api().get('dashboard', {
      params: dashboard
    })
  },
  post(dashboard) {
    return Api().post('dashboard', dashboard)
  },
  delete(urluserId) {
    return Api().delete(`dashboard/${urluserId}`)
  }
}

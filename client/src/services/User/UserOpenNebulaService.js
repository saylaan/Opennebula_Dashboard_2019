import Api from '@/services/Api'

export default {
  index() {
    return Api().get('useropennebulas')
  },
  post(useropennebula) {
    return Api().post('useropennebulas', useropennebula)
  },
  getUser(useropennebulaId) {
    return Api().get(`useropennebulas/${useropennebulaId}`)
  },
  put(useropennebula) {
    return Api().put(`useropennebulas/${useropennebula.id}`, useropennebula)
  }
}

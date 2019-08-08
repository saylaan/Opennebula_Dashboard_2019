import Api from '@/services/Api'

export default {
  index() {
    return Api().get('sip')
  },
  getSip(sipId) {
    return Api().get(`sip/${sipId}`)
  },
  post(sip) {
    return Api().post('sip', sip)
  },
  delete(sipId) {
    return Api().delete(`sip/${sipId}`)
  },
  put(sipId) {
    return Api().put(`sip/${sipId}`)
  },
  changePwd(sips) {
    console.log(sips)
    return Api().put('sip', sips)
  }
}

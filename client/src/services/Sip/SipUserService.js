import Api from '@/services/Api'

export default {
  index(sipId) {
    return Api().get('sipsUser', {
      params: sipId
    })
  },
  post(sipUser) {
    return Api().post('sipsUser', sipUser)
  },
  delete(sipUserId) {
    return Api().delete(`sipsUser/${sipUserId}`)
  }
}

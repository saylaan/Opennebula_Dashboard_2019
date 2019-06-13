import Api from '@/services/Api'

export default {
  index(UserOpenNebulaId) {
    return Api().get('userUserOns', {
      params: UserOpenNebulaId
    })
  },
  post(UserId, UserOpenNebulaId) {
    return Api().post('userUserOns', {
      UserOpenNebulaId: UserOpenNebulaId,
      UserId: UserId
    })
  },
  delete(UserUserOnId) {
    return Api().delete(`userUserOns/${UserUserOnId}`)
  }
}

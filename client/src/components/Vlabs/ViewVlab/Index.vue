<template>
<div>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <vlab-data :vlab="vlab"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <vlab-vms/>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <vlab-vm/>
      </v-flex>
    </v-layout>
</div>
</template>

<script>
import {mapState} from 'vuex'
import VlabData from './VlabData'
import VlabVm from './VlabVM'
import VlabVms from './VlabVMs'
import VlabService from '@/services/VlabService'
import VlabUserLogService from '@/services/VlabUserLogService'

export default {
  data () {
    return {
      vlab: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const vlabId = this.params.vlabId
    this.vlab = (await VlabService.getVlab(vlabId)).data

    if (this.isUserLoggedIn) {
      VlabUserLogService.post({
        VlabId: vlabId,
        UserId: this.user.id
      })
    }
  },
  components: {
    VlabData,
    VlabVm,
    VlabVms
  }
}
</script>

<style scoped>

</style>

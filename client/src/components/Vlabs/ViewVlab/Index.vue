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
import VlabData from './VlabData'
import VlabVm from './VlabVM'
import VlabVms from './VlabVMs'
import VlabService from '@/services/VlabService'

export default {
  data () {
    return {
      vlab: null
    }
  },
  async mounted () {
    const vlabId = this.$store.state.route.params.vlabId
    this.vlab = (await VlabService.getVlab(vlabId)).data
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

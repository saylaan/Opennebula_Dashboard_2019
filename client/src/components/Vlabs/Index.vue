<template>
  <v-layout>
      <v-flex xs6>
        <vlabs-users />
      </v-flex>
      <v-flex xs6 class="ml-2">
        <vlabs-search-panel />
        <vlabs-panel class="mt-2"/>
      </v-flex>
  </v-layout>
</template>

<script>
import VlabsPanel from './VlabsPanel'
import VlabsSearchPanel from './VlabsSearchPanel'
import VlabService from '@/services/VlabService'
import VlabsUsers from './VlabsUsers'

export default {
  data () {
    return {
      vlabs: null
    }
  },
  async mounted () { // request to the DB
    this.vlabs = (await VlabService.getAllVlabs()).data
  },
  components: {
    VlabsPanel,
    VlabsSearchPanel,
    VlabsUsers
  }
}
</script>

<style scoped>

</style>

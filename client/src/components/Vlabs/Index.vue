<template>
  <v-layout wrap>
      <v-flex xs6 offset-xs3>
        <vlabs-search-panel />
        <vlabs-panel class="mt-2"/>
      </v-flex>
  </v-layout>
</template>

<script>
import VlabsPanel from './VlabsPanel'
import VlabsSearchPanel from './VlabsSearchPanel'
import VlabService from '@/services/VlabService'

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
    VlabsSearchPanel
  }
}
</script>

<style scoped>

</style>

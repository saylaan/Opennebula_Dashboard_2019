<template>
  <v-layout>
      <v-flex xs6 offset-xs3>
        <panel title="Vlab view">
            <v-layout wrap>
              <v-flex xs6>
                <div class="vlab-title">
                  {{vlab.title}}
                </div>
                <div class="vlab-name">
                  {{vlab.name}}
                </div>
                <div class="vlab-time">
                  {{vlab.time}}
                </div>
              </v-flex>
              <v-flex xs6>
                <img class="album-image" :src="vlab.vlabImage" />
              </v-flex>
            </v-layout>
        </panel>
      </v-flex>
  </v-layout>
</template>

<script>
import VlabService from '@/services/VlabService'
import Panel from '@/components/Panel'

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
    Panel
  }
}
</script>

<style scoped>

.vlab {
  padding: 20px;
  height : 200px;
  overflow: hidden;
}

.vlab-title {
  font-size: 30px;
}

.vlab-name {
  font-size: 24px;
}

.vlab-time {
  font-size: 18px;
}

.album-image {
  width: 50%;
  margin: 0 auto;
}

</style>

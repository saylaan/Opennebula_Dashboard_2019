<template>
    <v-layout>
        <panel title="Vlab">
          <v-btn
            class="purple lighten-3"
            slot="action"
            :to="{name: 'vlab-create'}"
            light medium absolute right middle fab>
            <v-icon>add</v-icon>
          </v-btn>
          <div v-for="vlab in vlabs" :key="vlab.title" class="vlab">
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
                <v-btn dark class="purple"
                :to="{
                  name: 'vlab',
                  params: {
                    vlabId: vlab.id}
                 }">
                 View Vlab
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <img class="album-image" :src="vlab.vlabImage" />
              </v-flex>
            </v-layout>
          </div>
        </panel>
    </v-layout>
</template>

<script>
import VlabService from '@/services/VlabService'

export default {
  data () {
    return {
      vlabs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.vlabs = (await VlabService.getAllVlabs(value)).data
      }
    }
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

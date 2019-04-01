<template>
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
                <v-btn dark class="purple"
                :to="{
                  name: 'edit-vlab',
                  params () {
                    return {
                      vlabId: vlab.id
                    }
                  }
                 }">
                 Edit
                </v-btn>
            </v-layout>
        </panel>
</template>

<script>

export default {
  props: [
    'vlab'
  ]
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

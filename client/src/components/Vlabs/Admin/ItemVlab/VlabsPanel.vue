<template>
  <v-layout v-if="isUserLoggedIn && admin" column>
    <panel title="Vlabs">
      <v-btn
        class="grey darken-3"
        slot="action"
        :to="{name: 'vlab-create'}"
        light
        medium
        absolute
        right
        middle
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-flex v-for="vlab in vlabs" :key="vlab.title" class="vlab">
        <v-layout row>
          <v-flex xs6>
            <v-flex class="vlab-title">{{vlab.title}}</v-flex>
            <v-flex class="vlab-name">{{vlab.name}}</v-flex>
            <v-flex class="vlab-time">{{vlab.time}}</v-flex>
            <v-btn
              class="grey darken-1"
              :to="{
                  name: 'vlab',
                  params: {
                    vlabId: vlab.id}
                 }"
            >View Vlab</v-btn>
          </v-flex>
          <v-flex xs6>
            <img class="album-image" :src="vlab.vlabImage">
          </v-flex>
        </v-layout>
      </v-flex>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/VlabService";

export default {
  data() {
    return {
      vlabs: null
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.vlabs = (await VlabService.getAllVlabs(value)).data;
      }
    }
  }
};
</script>

<style scoped>
.vlab {
  padding: 20px;
  height: 200px;
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

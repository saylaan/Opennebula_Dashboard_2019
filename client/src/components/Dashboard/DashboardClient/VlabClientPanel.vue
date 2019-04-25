<template>
  <v-layout column>
    <panel v-if="isUserLoggedIn" title="Total vlab">
      <v-flex class="vlab">
      <h2> Active Vlab : {{ totalVlabs }}</h2>
      </v-flex>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import VlabService from "@/services/Vlab/VlabService";

export default {
  data() {
    return {
      vlabs: null,
      totalVlabs: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.vlabs = (await VlabService.getAllVlabs()).data;
        for (let vlab in this.vlabs) {
          this.totalVlabs++
        }
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

</style>

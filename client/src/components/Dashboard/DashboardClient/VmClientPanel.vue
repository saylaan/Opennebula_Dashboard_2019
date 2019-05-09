<template>
  <panel v-if="isUserLoggedIn" title="Vm Info">
    <v-flex class="vlab">
      <h2>Active Vm : {{ activeVms }}</h2>
      <br>
      <br>
      <h2>Unactive Vm : {{ totalVms - activeVms }}</h2>
      <br>
      <br>
      <h2>Total Vm : {{ totalVms }}</h2>
    </v-flex>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VmVlabService from "@/services/Vm/VmVlabService";
import VlabUserService from "@/services/Vlab/VlabUserService";

export default {
  data() {
    return {
      vms: null,
      vlabs: null,
      totalVms: 0,
      activeVms: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.vlabs = (await VlabUserService.getVlabUsers()).data;
        for (var i = 0; i !== this.vlabs.length; i++) {
          this.vms = (await VmVlabService.index({
            VlabId: this.vlabs[i].id
          })).data;
          for (var j = 0; j !== this.vms.length; j++) {
            this.totalVms++;
            if (this.vms[j].active) {
              this.activeVms++;
            }
          }
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

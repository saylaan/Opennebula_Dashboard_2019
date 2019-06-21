<template>
  <panel v-if="isUserLoggedIn" title="Vm Info">
    <v-flex class="vlab">
      <h2>Active Vm : {{ activevms }}</h2>
      <br>
      <br>
      <h2>Unactive Vm : {{ totalvms - activevms }}</h2>
      <br>
      <br>
      <h2>Total Vm : {{ totalvms }}</h2>
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
      vmvlabs: null,
      vlabusers: null,
      totalvms: 0,
      activevms: 0
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.vlabusers = (await VlabUserService.index()).data;
        for (var i = 0; i !== this.vlabusers.length; i++) {
          this.vmvlabs = (await VmVlabService.index({
            VlabId: this.vlabusers[i].id
          })).data;
          for (var j = 0; j !== this.vmvlabs.length; j++) {
            this.totalvms++;
            if (this.vmvlabs[j].active) {
              this.activevms++;
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

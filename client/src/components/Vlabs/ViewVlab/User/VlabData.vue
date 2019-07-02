<template>
  <panel v-if="isUserLoggedIn && !admin" title="Vlab view">
    <v-divider></v-divider>
    <v-layout class="vlab" row>
      <v-flex xs3>
        <div>{{vlab.nameparse}}</div>
      </v-flex>
      <v-flex xs3>
        <div>{{vlab.ownername}}</div>
      </v-flex>
      <v-flex xs2>
        <div>{{vlab.active ? 'OK' : 'KO'}}</div>
      </v-flex>
      <v-flex xs4>
        <div>{{needCredential(vlab.dayleft)}}</div>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/Vlab/VlabUserService";
import VlabService from '@/services/Vlab/VlabService'

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "route", "user", "admin"])
  },
  data() {
    return {
      vlabuser: null,
      vlab: {}
    };
  },
  watch: {
    async watcher() {
      const vlabId = this.route.params.vlabId;
      this.vlab = (await VlabService.getVlab(vlabId)).data
    },
    async vlab() {
      if (!this.isUserLoggedIn) {
        return;
      }
      try {
        const vlabId = this.route.params.vlabId;
        const vlabuser = (await VlabUserService.getVlabUser(vlabId)).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    const vlabId = this.route.params.vlabId;
    this.vlab = (await VlabService.getVlab(vlabId)).data
    try {
      const vlabId = this.route.params.vlabId;
      const vlabuser = (await VlabUserService.getVlabUser(vlabId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async setUser() {
      try {
        this.vlabuser = (await VlabUserService.post({
          VlabId: this.vlab.id
        })).data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUser() {
      try {
        this.vlabuser = await VlabUserService.delete(this.vlabuser.id);
        this.vlabuser = null;
      } catch (err) {
        console.log(err);
      }
    },
    needCredential(time) {
      if (time <= 1) {
        return "Need credential";
      }
      return time;
    }
  }
};
</script>

<style scoped>
.vlab {
  padding: 20px;
  overflow: hidden;
  min-width: 200px;
}

</style>

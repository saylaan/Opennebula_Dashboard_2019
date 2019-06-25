<template>
  <panel v-if="isUserLoggedIn" title="Vlab view">
      <v-layout align-center justify-center row>
        <v-flex xs4 offset-xs1 class="vlab-title">
          <h5>
            Name:
            {{vlab.nameparse}}
          </h5>
        </v-flex>
        <v-flex xs4 class="vlab-name ml-1">
          <h5>
            Day left:
            {{ needCredential(vlab.dayleft) }}
          </h5>
        </v-flex>
        <v-flex xs4 class="vlab-time ml-1">
          <h5>
            Active :
            {{vlab.active? 'OK' : 'KO'}}
          </h5>
        </v-flex>
      </v-layout>
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
      vlab: null
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
  height: 200px;
  overflow: hidden;
}

.vlab-title {
  font-size: 20px;
}

.vlab-name {
  font-size: 20px;
}

.vlab-time {
  font-size: 20px;
}
</style>

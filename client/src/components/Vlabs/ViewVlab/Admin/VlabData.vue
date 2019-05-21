<template>
  <panel v-if="isUserLoggedIn && admin" title="Vlab view">
    <v-layout row align-center justify-center>
        <v-flex xs2 class="vlab-title">
          <h5>
            Vlab name :
            {{vlab.title}}
          </h5>
        </v-flex>
        <v-flex xs3 class="vlab-name">
          <h5>
            Company name :
            {{vlab.name}}
          </h5>
        </v-flex>
        <v-flex xs3 class="vlab-time">
          <h5>
            Day left :
            {{ needCredential(vlab.time) }}
          </h5>
        </v-flex>
        <v-flex xs2 class="vlab-time">
          <h5>
            Active :
            {{vlab.active? 'OK' : 'KO'}}
          </h5>
        </v-flex>
        <v-flex xs2>
          <!-- <v-btn
            class="grey darken-1 font-weight-bold"
            :to="{
                  name: 'edit-vlab',
                  params () {
                    return {
                      vlabId: vlab.id
                    }
                  }
                 }"
          >Edit</v-btn> -->
          <v-btn
            v-if="isUserLoggedIn && !this.vlabuser"
            class="grey darken-1 font-weight-bold"
            @click="setUser"
          >Add User</v-btn>
          <v-btn
            v-if="isUserLoggedIn && this.vlabuser"
            class="grey darken-1 font-weight-bold"
            @click="deleteUser"
          >Delete User</v-btn>
        </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/Vlab/VlabUserService";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  props: ["vlab"],
  data() {
    return {
      vlabuser: null
    };
  },
  watch: {
    async vlab() {
      if (!this.isUserLoggedIn) {
        return;
      }
      try {
        const vlabusers = (await VlabUserService.getVlabUsers({
          VlabId: this.vlab.id
        })).data;
        if (vlabusers.length) {
          this.vlabuser = vlabusers[0];
        }
      } catch (err) {
        console.log(err);
      }
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

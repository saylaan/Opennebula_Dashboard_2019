<template>
  <panel v-if="isUserLoggedIn && admin" title="Vlab view">
    <v-layout wrap>
      <v-flex xs6>
        <div class="vlab-title">{{vlab.title}}</div>
        <div class="vlab-name">{{vlab.name}}</div>
        <div class="vlab-time">{{vlab.time}}</div>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="vlab.vlabImage">
      </v-flex>
      <v-btn
        class="grey darken-1"
        :to="{
                  name: 'edit-vlab',
                  params () {
                    return {
                      vlabId: vlab.id
                    }
                  }
                 }"
      >Edit</v-btn>
      <v-btn v-if="isUserLoggedIn && !this.vlabuser" class="grey darken-1" @click="setUser">Add User</v-btn>
      <v-btn
        v-if="isUserLoggedIn && this.vlabuser"
        class="grey darken-1"
        @click="deleteUser"
      >Delete User</v-btn>
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

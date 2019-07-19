<template>
  <panel v-if="isUserLoggedIn && admin" title="Vlab view">
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
          <v-layout class="mt-3 mb-3" column justify-center align-center>
          <v-select v-if="isUserLoggedIn && !this.vlabuser"
            :items="users"
            item-text="email"
            v-model="userassign"
            label="User available"
            outline>
          </v-select>
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
          </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import VlabUserService from "@/services/Vlab/VlabUserService";
import UserService from "@/services/User/UserService";
import VlabService from "@/services/Vlab/VlabService";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  data() {
    return {
      vlabuser: null,
      users: [],
      userassign: null,
      vlab: {}
    };
  },
  async mounted() {
    try {
      const vlabId = this.route.params.vlabId;
      this.vlab = (await VlabService.getVlab(vlabId)).data
    } catch (err) {
      console.log(err)
    }
    try {
      this.users = (await UserService.index()).data
      for (let i = 0, j = 0; i !== this.users.length; i++) {
        if (this.users[i].admin) {
          this.users.splice(i, 1)
          i--
        }
      }
    } catch (err) {
      console.log(err)
    }
    try {
      const vlabId = this.route.params.vlabId;
      this.vlabuser = (await VlabUserService.getVlabUser(vlabId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async setUser() {
      try {
        let id = 0
        for (var j = 0; j !== this.users.length; j++) {
          if (this.users[j].email === this.userassign) {
            id = this.users[j].id
          }
        }
        this.vlabuser = (await VlabUserService.post({
          VlabId: this.vlab.id,
          UserId: id
        })).data;
        const vlabId = this.route.params.vlabId;
        this.vlab = (await VlabService.getVlab(vlabId)).data
        await VlabService.put({
          idopennebula: this.vlab.idopennebula,
          ownername: this.userassign,
          groupename: this.vlab.groupname,
          name: this.vlab.name,
          nameparse: this.vlab.nameparse,
          vlanid: this.vlab.vlanid,
          active: this.vlab.active,
          dayleft: this.vlab.dayleft
        }, vlabId)
        this.vlab = (await VlabService.getVlab(vlabId)).data
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUser() {
      try {
        let id = 0
        for (var j = 0; j !== this.users.length; j++) {
          if (this.users[j].username === this.vlab.ownername) {
            id = this.users[j].id
          }
        }
        this.vlabuser = await VlabUserService.delete(this.vlabuser.id);
        this.vlabuser = null;
        const vlabId = this.route.params.vlabId;
        await VlabService.put({
          idopennebula: this.vlab.idopennebula,
          ownername: "oneadmin",
          groupename: this.vlab.groupname,
          name: this.vlab.name,
          nameparse: this.vlab.nameparse,
          vlanid: this.vlab.vlanid,
          active: this.vlab.active,
          dayleft: this.vlab.dayleft
        }, vlabId)
        this.vlab = (await VlabService.getVlab(vlabId)).data
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

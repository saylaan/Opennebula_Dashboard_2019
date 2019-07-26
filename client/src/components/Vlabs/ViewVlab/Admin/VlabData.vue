<template>
  <panel v-if="isUserLoggedIn && admin" title="Vlab view">
      <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" :items="vlab">
        <template v-slot:items="props">
          <td class="text-xs-left">{{props.item.nameparse}}</td>
          <td class="text-xs-left">{{props.item.ownername}}</td>
          <td class="text-xs-left">{{needCredential(props.item.dayleft)}}</td>
          <td class="text-xs-left">{{props.item.assign ? 'YES': 'NO'}}</td>
        </template>
      </v-data-table>
    <!-- <v-divider></v-divider>
    <v-layout class="vlab" row>
      <v-flex xs3>
        <div>{{vlab.nameparse}}</div>
      </v-flex>
      <v-flex xs3>
        <div>{{vlab.ownername}}</div>
      </v-flex>
      <v-flex xs2>
        <div>{{vlab.assign ? 'YES' : 'NO'}}</div>
      </v-flex>
      <v-flex xs4>
        <div>{{needCredential(vlab.dayleft)}}</div>
      </v-flex>
    </v-layout> -->
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
            <v-layout row justify-center align-center>
          <v-select v-if="isUserLoggedIn && !this.vlabuser"
            :items="users"
            item-text="email"
            v-model="userassign"
            label="User available"
            outline>
          </v-select>
          <v-select v-if="isUserLoggedIn && !this.vlabuser"
            :items="licences"
            item-text="licence"
            v-model="dayslicence"
            label="Number of days"
            outline>
          </v-select>
            </v-layout>
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
import Swal from 'sweetalert2'

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  data() {
    return {
      licences: [30, 60, 90, 120, 150, 180],
      vlabuser: null,
      users: [],
      userassign: null,
      vlab: [],
      dayslicence: 30,
      headers: [
        {
          text: "Name",
          value: "nameparse"
        },
        {
          text: "Owner name",
          value: "ownername"
        },
        {
          text: "Remaining days",
          value: "dayleft"
        },
        {
          text: "Assigned",
          value: "assign"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      }
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
          VlabId: this.vlab[0].id,
          UserId: id
        })).data;
        const vlabId = this.route.params.vlabId;
        this.vlab = (await VlabService.getVlab(vlabId)).data
        const newUser = (await UserService.getUser(id)).data
        newUser.dayleft = this.dayslicence
        await UserService.put(newUser)
        await VlabService.put({
          idopennebula: this.vlab[0].idopennebula,
          ownername: this.userassign,
          groupename: this.vlab[0].groupname,
          name: this.vlab[0].name,
          nameparse: this.vlab[0].nameparse,
          vlanid: this.vlab[0].vlanid,
          assign: true,
          dayleft: this.dayslicence
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
          if (this.users[j].email === this.vlab[0].ownername) {
            id = this.users[j].id
          }
        }
        const newUser = (await UserService.getUser(id)).data
        newUser.dayleft = 0
        await UserService.put(newUser)
        this.vlabuser = await VlabUserService.delete(this.vlabuser.id);
        this.vlabuser = null;
        const vlabId = this.route.params.vlabId;
        await VlabService.put({
          idopennebula: this.vlab[0].idopennebula,
          ownername: "oneadmin",
          groupename: this.vlab[0].groupname,
          name: this.vlab[0].name,
          nameparse: this.vlab[0].nameparse,
          vlanid: this.vlab[0].vlanid,
          assign: false,
          dayleft: 0
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

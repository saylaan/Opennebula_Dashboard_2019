<template>
  <panel v-if="isUserLoggedIn && admin" title="Vlab view">
      <v-data-table :headers="headers" 
      hide-default-footer
      :loading="isData(vlab)"
      loading-text="No data for the moment"
      :items-per-page="1"
      :items="vlab">
        <template v-slot:item.dayleft="{item}">
          {{needCredential(item.dayleft, item.assign)}}
        </template>
        <template v-slot:item.assign="{item}">
          <v-chip :color="getWarning(item.dayleft)" text-color="white">{{getTypeWarning(item.dayleft)}}</v-chip>
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
          <v-text-field
            label="Number of days"
            v-model="dayslicence"
            :rules="[required]"
            outline
            clearable
          >
          </v-text-field>
            </v-layout>
            <v-layout justify-center align-center>
          <v-btn
            v-if="isUserLoggedIn && !this.vlabuser"
            class="grey darken-1 font-weight-bold"
            @click="setUser"
          >Add User</v-btn>
          <v-btn
            v-if="isUserLoggedIn && this.vlabuser"
            class="grey darken-1 font-weight-bold"
            @click="addDays"
          >Add Days</v-btn>
          <v-btn
            v-if="isUserLoggedIn && this.vlabuser"
            class="grey darken-1 font-weight-bold ml-2"
            @click="deleteUser"
          >Delete User</v-btn>
            </v-layout>
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
      vlabuser: null,
      users: [],
      userassign: null,
      vlab: [],
      dayslicence: 30,
      headers: [
        {text: "Name", value: "nameparse"},
        {text: "Owner name", value: "ownername"},
        {text: "Remaining days", value: "dayleft", align: "center"},
        {text: "", value: "assign"}
      ],
      required: value => !!value || "Required."
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
    needCredential(time, assign) {
      if (!assign) {
        return "-";
      }
      return time;
    },
    getWarning(time) {
      if (time < 3) {
        return 'red'
      } else if (time >= 3 && time < 7) {
        return 'orange'
      } else {
        return 'green'
      }
    },
    isData(vlabs) {
      if (vlabs) {
        return (false)
      } else {
        return (true)
      }
    },
    getTypeWarning(time) {
      if (time < 3) {
        return 'High'
      } else if (time >= 3 && time < 7) {
        return 'Medium'
      } else {
        return 'Low'
      }
    },
    async addDays() {
      let lab = (await VlabService.getVlab(this.vlabuser.VlabId)).data
      let usertmp = (await UserService.getUser(this.vlabuser.UserId)).data
      if (usertmp.dayleft !== 0) {
        usertmp.dayleft = usertmp.dayleft + parseInt(this.dayslicence, 10)
      } else {
        usertmp.dayleft = parseInt(this.dayslicence, 10)
      }
      if (lab[0].dayleft !== 0) {
        lab[0].dayleft = lab[0].dayleft + parseInt(this.dayslicence, 10)
      } else {
        lab[0].dayleft = parseInt(this.dayslicence, 10)
      }
      await UserService.put(usertmp)
      await VlabService.put({
        idopennebula: lab[0].idopennebula,
        ownername: lab[0].ownername,
        groupename: lab[0].groupname,
        name: lab[0].name,
        nameparse: lab[0].nameparse,
        vlanid: lab[0].vlanid,
        assign: lab[0].assign,
        dayleft: lab[0].dayleft
      }, this.vlabuser.VlabId)
      this.vlab = (await VlabService.getVlab(this.vlabuser.VlabId)).data
      await document.location.reload(true)
    },
    async setUser() {
      try {
        let id = 0
        for (var j = 0; j !== this.users.length; j++) {
          if (this.users[j].email === this.userassign) {
            id = this.users[j].id
          }
        }
        const vlabId = this.route.params.vlabId;
        this.vlab = (await VlabService.getVlab(vlabId)).data
        const newUser = (await UserService.getUser(id)).data
        newUser.assign = true
        newUser.dayleft = parseInt(this.dayslicence, 10)
        await UserService.put(newUser)
        await VlabService.put({
          idopennebula: this.vlab[0].idopennebula,
          ownername: this.userassign,
          groupename: this.vlab[0].groupname,
          name: this.vlab[0].name,
          nameparse: this.vlab[0].nameparse,
          vlanid: this.vlab[0].vlanid,
          assign: true,
          dayleft: parseInt(this.dayslicence, 10)
        }, vlabId)
        this.vlabuser = (await VlabUserService.post({
          VlabId: this.vlab[0].id,
          UserId: id
        })).data;
        this.vlab = (await VlabService.getVlab(vlabId)).data
        await document.location.reload(true)
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
        newUser.assign = false
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
        await document.location.reload(true)
        this.vlab = (await VlabService.getVlab(vlabId)).data
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>

</style>

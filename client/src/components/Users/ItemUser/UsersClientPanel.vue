<template>
  <v-layout justify-center>
    <v-flex xs12 md10>
    <panel title="Client">
   <v-btn
      class="grey darken-3"
      slot="action"
      :to="{name: 'user-create'}"
      light
      medium
      absolute
      right
      middle
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>
      <v-data-table
        :headers="headers" 
        :items-per-page="5"
        :loading="isData(users)" 
        loading-text="No data for the moment"
        class="elevation-12"
        :items="users">
          <template v-slot:item.email="{item}">
          <a :href="'mailto:' + item.email + '?subject=INFO'" class="text-xs-left">{{item.email}}</a>
          </template>
          <template v-slot:item.dayleft="{ item }">
          <v-chip class="ma-2" text-color="white" :color="getWarning(item.dayleft)"></v-chip>
          </template>"
          <template v-slot:item.id="{item}">
            <v-layout row align-center justify-center>
            <v-btn
              class="grey darken-1 font-weight-bold ml-1 mt-1"
              :to="{
                  name: 'edit-user',
                  params: {
                    userId: item.id}
              }"
           >Edit</v-btn>
            <v-btn @click="archiveUser(item.id)"
              class="grey darken-1 font-weight-bold ml-1 mt-1"
            >Archive</v-btn>
            </v-layout>
          </template>
      </v-data-table>
    </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"
import VlabService from "@/services/Vlab/VlabService"
import VlabUserService from '@/services/Vlab/VlabUserService'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      headers: [
        {text: "Email", value: "email", sortable: false, align: "center"},
        {text: "Company", value: "companyname", align: "center"},
        {text: "Firstname", value: "firstname", align: "center"},
        {text: "Lastname", value: "lastname", align: "center"},
        {text: "Remaining days", value: "dayleft", align: "center"},
        {text: "", value: "id"}
      ],
      users: []
    }
  },
  async mounted() {
    this.users = (await UserService.index()).data;
    for (let i = 0, j = 0; i !== this.users.length; i++) {
      if (this.users[i].admin === true || this.users[i].archive === true) {
        this.users.splice(i, 1)
        i--
      }
    }
  },
  methods: {
    getWarning(time) {
      if (time <= 3) {
        return "red"
      } else if (time > 3 && time <= 7) {
        return "orange"
      } else {
        return "green"
      }
    },
    isData(data) {
      if (data) {
        return (false)
      } else {
        return (true)
      }
    },
    async archiveUser(id) {
      try {
        const {value: opt} = await Swal.fire({
          title: 'Are you sure you want to archvive the User? It will be deassign',
          input: 'radio',
          inputOptions: [
            'Yes',
            'No'
          ]
        })
        if (opt === "0") {
          const newUser = (await UserService.getUser(id)).data
          if (newUser.dayleft !== 0) {
            let vlabs = (await VlabService.getAllVlabs()).data
            vlabs.forEach(async vlab => {
              if (vlab.ownername === newUser.email) {
                let vlabuser = (await VlabUserService.getVlabUser(vlab.id)).data
                vlabuser = await VlabUserService.delete(vlabuser.id);
                await VlabService.put({
                  idopennebula: vlab.idopennebula,
                  ownername: "oneadmin",
                  groupename: vlab.groupname,
                  name: vlab.name,
                  nameparse: vlab.nameparse,
                  vlanid: vlab.vlanid,
                  assign: false,
                  dayleft: 0
                }, vlab.id)
              }
            })
          }
          newUser.dayleft = 0
          newUser.assign = false
          newUser.archive = true
          await UserService.put(newUser)
          await document.location.reload(true)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async mailTo(email) {
      return ('mailto:' + email + "?subject=INFO")
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  }
  // watch: {
  //   "$route.query.find": {
  //     immediate: true,
  //     async handler(value) {
  //       this.users = (await UserService.index(value)).data;
  //     }
  //   }
  // }
};
</script>

<style scoped>

</style>

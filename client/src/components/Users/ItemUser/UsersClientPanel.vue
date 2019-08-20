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
      <v-card>
      <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items-per-page="5"
        :loading="isData(users)" 
        loading-text="No data for the moment"
        class="elevation-12"
        :search="search"
        :items="users">
          <template v-slot:item.email="{item}">
          <a :href="'mailto:' + item.email + '?subject=INFO'" class="text-xs-left">{{item.email}}</a>
          </template>
        <template v-slot:item.dayleft="{item}">
          {{needCredential(item.dayleft, item.assign)}}
        </template>
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
      </v-card>
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
      search: '',
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
    needCredential(time, assign) {
      if (!assign) {
        return "-";
      }
      return time;
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
          let newUser = (await UserService.getUser(id)).data
          if (newUser.dayleft !== 0) {
            let vlabs = (await VlabService.getAllVlabs()).data
            await vlabs.forEach(async vlab => {
              if (vlab.ownername === newUser.email) {
                let vlabuser = (await VlabUserService.getVlabUser(vlab.id)).data
                vlabuser = (await VlabUserService.delete(vlabuser.id)).data;
                const vlabId = vlab.id
                const tmp = (await VlabService.put({
                  idopennebula: vlab.idopennebula,
                  ownername: "oneadmin",
                  groupename: vlab.groupname,
                  name: vlab.name,
                  nameparse: vlab.nameparse,
                  vlanid: vlab.vlanid,
                  assign: false,
                  dayleft: 0
                }, vlabId)).data
              }
            })
          }
          newUser.dayleft = 0
          newUser.assign = false
          newUser.archive = true
          newUser = (await UserService.put(newUser)).data
          setTimeout(async () => {
            await document.location.reload(true)
          }, 3000)
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

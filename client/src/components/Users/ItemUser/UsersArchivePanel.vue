<template>
  <v-layout justify-center>
    <v-flex xs12 md10>
    <panel title="Archive">
      <v-card>
      <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items-per-page="10"
        :loading="isData(users)"
        :search="search"
        loading-text="No data for the moment"
        class="elevation-12"
        :items="users">
          <template v-slot:item.email="{item}">
          <a :href="'mailto:' + item.email + '?subject=INFO'" class="text-xs-left">{{item.email}}</a>
          </template>
          <template v-slot:item.admin="{item}">
          {{isAdmin(item.admin)}}
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
            <v-btn @click="unarchiveUser(item.id)"
              class="grey darken-1 font-weight-bold ml-1 mt-1 "
            >Unarchive</v-btn>
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
        {text: "Status", value: "admin", align: "center"},
        {text: "", value: "id"}
      ],
      users: []
    }
  },
  async mounted() {
    this.users = (await UserService.index()).data;
    for (let i = 0, j = 0; i !== this.users.length; i++) {
      if (!this.users[i].archive) {
        this.users.splice(i, 1)
        i--
      }
    }
  },
  methods: {
    isData(data) {
      if (data) {
        return (false)
      } else {
        return (true)
      }
    },
    isAssign(dayleft) {
      if (dayleft !== 0) {
        return ('YES')
      } else {
        return ('NO')
      }
    },
    async unarchiveUser(id) { // ASSIGN VLAB IF WE WANT!
      try {
        const {value: opt} = await Swal.fire({
          title: 'Are you sure you want to unarchive the user or admin?',
          input: 'radio',
          inputOptions: [
            'Yes',
            'No'
          ]
        })
        if (opt === "0") {
          let newUser = (await UserService.getUser(id)).data
          newUser.archive = false
          newUser = (await UserService.put(newUser)).data
        }
      } catch (err) {
        console.log(err)
      }
    },
    isAdmin(admin) {
      if (admin) {
        return ('Admin')
      } else {
        return 'User'
      }
    },
    async mailTo(email) {
      return ('mailto:' + email + "?subject=INFO")
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    async users() {
      this.users = (await UserService.index()).data;
      for (let i = 0, j = 0; i !== this.users.length; i++) {
        if (this.users[i].admin === true || this.users[i].archive !== true) {
          this.users.splice(i, 1)
          i--
        }
      }
    }
  }
};
</script>

<style scoped>

</style>

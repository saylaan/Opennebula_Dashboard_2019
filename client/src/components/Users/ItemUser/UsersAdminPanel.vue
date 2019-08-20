<template>
  <v-layout justify-center>
    <v-flex xs12 md10>
    <panel title="Admin">
      <v-card>
      <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items-per-page="5"
        :search="search"
        :loading="isData(users)" 
        loading-text="No data for the moment"
        class="elevation-12"
        :items="users">
          <template v-slot:item.email="{item}">
          <a :href="'mailto:' + item.email + '?subject=INFO'" class="text-xs-left">{{item.email}}</a>
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
        {text: "", value: "id"}
      ],
      users: []
    }
  },
  async mounted() {
    this.users = (await UserService.index()).data;
    for (let i = 0, j = 0; i !== this.users.length; i++) {
      if (!this.users[i].admin || this.users[i].archive) {
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
    async archiveUser(id) {
      try {
        const {value: opt} = await Swal.fire({
          title: 'Are you sure you want to archvive the Admin?',
          input: 'radio',
          inputOptions: [
            'Yes',
            'No'
          ]
        })
        if (opt === "0") {
          let newUser = (await UserService.getUser(id)).data
          newUser.assign = false
          newUser = (await UserService.put(newUser)).data
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
  },
  watch: {
    async users() {
      this.users = (await UserService.index()).data;
      for (let i = 0, j = 0; i !== this.users.length; i++) {
        if (!this.users[i].admin || this.users[i].archive) {
          this.users.splice(i, 1)
          i--
        }
      }
    }
  }
};
</script>

<style scoped>
.user {
  padding: 20px;
  height: 100px;
  overflow: hidden;
}

.user-companyname {
  font-size: 20px;
}

.user-firstname {
  font-size: 20px;
}

.user-lastname {
  font-size: 20px;
}

.user-purpose {
  font-size: 20px;
}
</style>

<template>
  <v-layout v-if="isUserLoggedIn && admin" column>
    <panel title="Admin">
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
      <v-data-table :headers="headers" hide-actions :items="users">
        <template v-slot:items="props">
          <a :href="'mailto:' + props.item.email + '?subject=INFO'" class="text-xs-left">{{props.item.email}}</a>
          <td class="text-xs-left">{{props.item.companyname}}</td>
          <td class="text-xs-left">{{props.item.lastname}}</td>
          <td class="text-xs-left">{{props.item.firstname}}</td>
          <v-layout row justify-center>
            <v-btn
              class="grey darken-1 font-weight-bold"
              :to="{
                  name: 'edit-user',
                  params: {
                    userId: props.item.id}
              }"
           >Edit</v-btn>
            <v-btn @click="archiveUser(props.item.id)"
              class="grey darken-1 font-weight-bold"
            >Archive</v-btn>
          </v-layout>
        </template>
      </v-data-table>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      headers: [
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Company",
          value: "company"
        },
        {
          text: "Lastname",
          value: "lastname"
        },
        {
          text: "Firstname",
          value: "firstname"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      },
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
          const newUser = (await UserService.getUser(id)).data
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

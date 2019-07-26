<template>
  <v-layout v-if="isUserLoggedIn && admin" column>
    <panel title="Users">
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
          <td class="text-xs-left">{{isAdmin(props.item.admin)}}</td>
          <td class="text-xs-left">{{isAssign(props.item.dayleft)}}</td>
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
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Assign",
          value: "assign"
        }
      ],
      pagination: {
        sortBy: "createAt",
        descending: true
      },
      users: []
    }
  },
  methods: {
    isAssign(dayleft) {
      if (dayleft !== 0) {
        return ('YES')
      } else {
        return ('NO')
      }
    },
    async archiveUser(id) {
      try {
        const {value: opt} = await Swal.fire({
          title: 'Are you sure you want to delete the User? It will be deleted permanently',
          input: 'radio',
          inputOptions: [
            'Yes',
            'No'
          ]
        })
        if (opt === "0") {
          // const userdel = (await UserService.delete(id)).data
          // this.users = (await UserService.index()).data;
        }
      } catch (err) {
        console.log(err)
      }
    },
    isAdmin(admin) {
      if (admin) {
        return ('admin')
      } else {
        return 'user'
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
    "$route.query.find": {
      immediate: true,
      async handler(value) {
        this.users = (await UserService.index(value)).data;
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

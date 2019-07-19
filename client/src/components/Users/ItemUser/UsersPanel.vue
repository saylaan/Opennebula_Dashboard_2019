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
          <td class="text-xs-left">{{props.item.companyname}}</td>
          <td class="text-xs-left">{{props.item.lastname}}</td>
          <td class="text-xs-left">{{props.item.firstname}}</td>
          <td class="text-xs-left">{{props.item.purpose}}</td>
          <v-layout row justify-center>
            <v-btn
              class="grey darken-1 font-weight-bold"
              :to="{
                  name: 'edit-user',
                  params: {
                    userId: props.item.id}
              }"
           >Edit</v-btn>
            <v-btn @click="deleteUser(props.item.id)"
              class="grey darken-1 font-weight-bold"
            >Delete</v-btn>
          </v-layout>
        </template>
      </v-data-table>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService"

export default {
  data () {
    return {
      headers: [
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
          text: "Purpose",
          value: "purpose"
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
    async deleteUser(id) {
      try {
        const userdel = (await UserService.delete(id)).data
        this.users = (await UserService.index()).data;
      } catch (err) {
        console.log(err)
      }
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

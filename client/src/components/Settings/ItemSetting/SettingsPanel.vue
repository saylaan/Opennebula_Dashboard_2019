<template>
  <panel v-if="isUserLoggedIn" title="Setting">
    <v-text-field v-if="admin" label="Company name" v-model="adminview.companyname" :rules="[required]"></v-text-field>
    <br>
    <v-text-field v-if="admin" label="First name" v-model="adminview.firstname" :rules="[required]"></v-text-field>
    <br>
    <v-text-field v-if="admin" label="Last name" v-model="adminview.lastname" :rules="[required]"></v-text-field>
    <br>
    <v-text-field v-if="admin" label="Email" v-model="adminview.email" :rules="[required]"></v-text-field>
    <v-text-field v-if="!admin" label="Email" v-model="userview.email" :rules="[required]"></v-text-field>
    <br>
    <v-text-field v-if="admin" label="Password" v-model="adminview.password" type="password" :rules="[required]"></v-text-field>
    <v-text-field v-if="!admin" label="Password" v-model="userview.password" type="password" :rules="[required]"></v-text-field>
    <br>
    <v-textarea v-if="admin" label="Purpose" v-model="adminview.purpose" :rules="[required]"></v-textarea>
    <br>
    <v-btn @click="saveSettings()" class="blue-grey lighten-3">Save Setting</v-btn>
    <v-btn @click="discardSettings()" class="blue-grey lighten-3">Discard Setting</v-btn>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      userview: {
        email: null,
        password: null
      },
      adminview: {
        companyname: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        purpose: null
      },
      error: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    async saveSettings() {
      this.error = null;
      if (this.admin) {
        const areAllFieldsFilledIn = Object.keys(this.adminview).every(
          key => !!this.adminview[key]
        );
        if (!areAllFieldsFilledIn) {
          this.error = "Please fill in all the required fields.";
          return;
        }
        try {
          await UserService.updateSettings(this.adminview);
          this.$router.push({name: 'settings'});
        } catch (err) {
          console.log(err);
        }
      } else {
        if (!this.userview.password || !this.userview.email) {
          this.error = "Please fill in all the required fields.";
          return
        }
        try {
          await UserService.updateSettings(this.userview);
          this.$router.push({name: 'settings'});
        } catch (err) {
          console.log(err);
        }
      }
    },
    async discardSettings() {
      try {
        if (!this.admin) {
          this.userview = (await UserService.getUser(this.user.id)).data;
        } else {
          this.adminview = (await UserService.getUser(this.user.id)).data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    try {
      if (!this.admin) {
        this.userview = (await UserService.getUser(this.user.id)).data;
      } else {
        this.adminview = (await UserService.getUser(this.user.id)).data;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
</style>

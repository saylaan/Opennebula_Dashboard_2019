<template>
  <v-layout v-on:keyup.enter="saveSettings">
    <v-flex xs12 md10>

  <panel v-if="isUserLoggedIn" title="Setting">
    <form class="mt-5">
    <v-text-field
      v-if="admin"
      label="Company name"
      v-model="adminview.companyname"
      :rules="[required]"
      outline
      clearable
    >
      <!-- <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          The name of the company must be valid
        </v-tooltip>
      </template> -->
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>domain</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      class="padding-input"
      outline
      clearable
      v-if="admin"
      label="First name"
      v-model="adminview.firstname"
      :rules="[required]"
    >
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>account_box</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      class="padding-input"
      outline
      clearable
      v-if="admin"
      label="Last name"
      v-model="adminview.lastname"
      :rules="[required]"
    >
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>account_box</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      outline
      clearable
      v-if="admin"
      label="Email"
      v-model="adminview.email"
      :rules="[required]"
    >
      <!-- <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your email must be valid
        </v-tooltip>
      </template> -->
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>email</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      outline
      clearable
      v-if="admin"
      label="Confirm Email"
      v-model="confirmEmail"
      :rules="[required]"
    >
      <!-- <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your email must be valid
        </v-tooltip>
      </template> -->
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>email</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <!-- <v-text-field
      outline
      clearable
      v-if="!admin"
      label="Email"
      v-model="userview.email"
      :rules="[required]"
    >
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your email must be valid
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>email</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field> -->
    <v-text-field
      label="Current password"
      v-model="oldPassword"
      type="password"
      :rules="[required]"
      outline
      clearable
    >
      <!-- <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your password must contain at least 8 characters
        </v-tooltip>
      </template> -->
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>https</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      label="New password"
      v-model="newPassword"
      type="password"
      outline
      clearable
    >
      <!-- <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your password must contain at least 8 characters
        </v-tooltip>
      </template> -->
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>https</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      outline
      clearable
      label="Confirm your new password"
      v-model="confirmPassword"
      type="password"
    >
      <!-- <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your password must contain at least 8 characters
        </v-tooltip>
      </template> -->
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>https</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
          <!-- <v-textarea label="Purpose" type="purpose" v-model="userview.purpose" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Explain for what purpose you need a access to the portal
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>notes</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea> -->
          <!-- <v-layout justify-center>
            <v-flex xs6>
          <v-switch v-if="!admin" large color="red" v-model="userview.emailactive" label="Active message by email"></v-switch>
          <v-switch v-if="admin" large color="red" v-model="adminview.emailactive" label="Active message by email"></v-switch>
            </v-flex>
          </v-layout> -->
    <v-layout column class="mb-4" justify-center align-center>
    <span class="danger-alert">{{error}}</span>
      <v-layout class="mt-2" justify-center align-center row>
    <v-btn elevation-24 large @click="saveSettings()" class="grey darken-1 font-weight-bold">Save</v-btn>
    <v-btn elevation-24 large @click="cancelSettings()" class="grey darken-1 font-weight-bold ml-1">Cancel</v-btn>
        <v-icon @click="undoSettings()">refresh</v-icon>
      </v-layout>
    </v-layout>
    </form>
  </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";
import Swal from 'sweetalert2'
import crypto from 'crypto'

export default {
  data() {
    return {
      userview: {
        active_hash: null,
        salt: null,
        password: null
        // emailactive: false
      },
      adminview: {
        companyname: null,
        firstname: null,
        lastname: null,
        email: null,
        active_hash: null,
        salt: null,
        password: null
        // emailactive: false
      },
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      confirmEmail: null,
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
          key => {
            if (key === 'emailactive' || key === 'active_hash' || key === 'salt' || key === 'dayleft' || key === 'password' || key === 'assign' || key === 'archive') {
              return (true)
            }
            return (!!this.adminview[key])
          }
        );
        if (!areAllFieldsFilledIn) {
          this.error = "Please fill in all the required fields.";
          return;
        }
        if (this.confirmEmail !== this.adminview.email) {
          this.error = "The emails don't match"
          return;
        }
        if (this.confirmPassword && this.newPassword) {
          if (this.confirmPassword !== this.newPassword) {
            this.error = "The new passwords don't match"
            return;
          }
        }
        try {
          const hash = crypto.pbkdf2Sync(this.oldPassword, this.user.salt, 1000, 64, `sha512`).toString(`hex`)
          const isPasswordValid = this.user.active_hash === hash
          if (isPasswordValid) {
            this.adminview.salt = crypto.randomBytes(16).toString(`hex`)
            this.adminview.active_hash = crypto.pbkdf2Sync(this.newPassword, this.adminview.salt,
              1000, 64, `sha512`).toString(`hex`)
            await UserService.updateSettings(this.adminview);
            this.$router.push({ name: "vlabs" });
          } else {
            this.error = "You entered the wrong password"
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        const areAllFieldsFilledIn = Object.keys(this.userview).every(
          key => {
            if (key === 'active_hash' || key === 'salt' || key === 'admin' || key === 'companyname' || key === 'firstname' || key === 'lastname' || key === 'email' || key === 'emailactive' || key === 'active_hash' || key === 'dayleft' || key === 'assign' || key === 'startlicence' || key === 'endlicence' || key === 'archive' || key === 'password') {
              return (true)
            }
            return (!!this.userview[key])
          }
        );
        if (!areAllFieldsFilledIn) {
          this.error = "Please fill in all the required fields.";
          return;
        }
        if (this.confirmPassword && this.newPassword) {
          if (this.confirmPassword !== this.newPassword) {
            this.error = "The new passwords don't match"
            return;
          }
        }
        try {
          const hash = crypto.pbkdf2Sync(this.oldPassword, this.user.salt, 1000, 64, `sha512`).toString(`hex`)
          const isPasswordValid = this.user.active_hash === hash
          if (isPasswordValid) {
            this.userview.salt = crypto.randomBytes(16).toString(`hex`)
            this.userview.active_hash = crypto.pbkdf2Sync(this.newPassword, this.userview.salt,
              1000, 64, `sha512`).toString(`hex`)
            await UserService.updateSettings(this.userview);
            this.$router.push({ name: "dashboard" });
          } else {
            this.error = "You entered the wrong password"
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async undoSettings() {
      try {
        this.error = null
        if (!this.admin) {
          this.userview = (await UserService.getUser(this.user.id)).data;
          this.oldPassword = null
          this.newPassword = null
          this.confirmPassword = null
        } else {
          this.adminview = (await UserService.getUser(this.user.id)).data;
          this.confirmEmail = this.adminview.email
        }
      } catch (err) {
        console.log(err);
      }
    },
    async cancelSettings() {
      if (!this.admin) {
        this.$router.push({name: "dashboard"})
      } else {
        this.$router.push({name: "vlabs"})
      }
    }
  },
  async mounted() {
    try {
      if (!this.admin) {
        this.userview = (await UserService.getUser(this.user.id)).data;
      } else {
        this.adminview = (await UserService.getUser(this.user.id)).data;
        this.confirmEmail = this.adminview.email
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>

</style>

<template>
  <panel v-if="isUserLoggedIn" title="Setting">
    <v-text-field
      v-if="admin"
      label="Company name"
      v-model="adminview.companyname"
      :rules="[required]"
      outline
      clearable
    >
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          The name of the company must be valid
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>domain</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <br>
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
    <br>
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
    <br>
    <v-text-field
      outline
      clearable
      v-if="admin"
      label="Email"
      v-model="adminview.email"
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
    <br>
    <v-text-field
      v-if="admin"
      label="Password"
      v-model="adminview.password"
      type="password"
      :rules="[required]"
      outline
      clearable
    >
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your password must contain at least 8 characters
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>https</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      outline
      clearable
      v-if="!admin"
      label="Password"
      v-model="userview.password"
      type="password"
      :rules="[required]"
    >
      <template v-slot:prepend>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">help</v-icon>
          </template>
          Your password must contain at least 8 characters
        </v-tooltip>
      </template>
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-icon>https</v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
    <br>
          <v-textarea label="Purpose" type="purpose" v-model="purpose" outline clearable>
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
          </v-textarea>
    <v-btn elevation-24 large @click="saveSettings()" class="grey darken-1 font-weight-bold">Save Setting</v-btn>
    <v-btn elevation-24  large @click="discardSettings()" class="grey darken-1 font-weight-bold">Discard Setting</v-btn>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      userview: {
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
          this.$router.push({ name: "settings" });
        } catch (err) {
          console.log(err);
        }
      } else {
        const areAllFieldsFilledIn = Object.keys(this.userview).every(
          key => !!this.userview[key]
        );
        if (!areAllFieldsFilledIn) {
          this.error = "Please fill in all the required fields.";
          return;
        }
        if (!this.userview.password || !this.userview.email) {
          this.error = "Please fill in all the required fields.";
          return;
        }
        try {
          await UserService.updateSettings(this.userview);
          this.$router.push({ name: "settings" });
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
.padding-input {
  margin-left: 32px;
}
</style>

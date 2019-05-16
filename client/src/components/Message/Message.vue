<template>
  <v-layout justify-center>
    <v-flex xs6 elevation-24>
      <panel title="Message FAQ" v-if="!isUserLoggedIn">
        <form>
          <v-layout class="mt-5" row>
            <v-flex xs6>
              <v-text-field class="padding-input" outline clearable label="lastname" v-model="msg.lastname"
              type="lastname" :rules="[required]">
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-icon>account_box</v-icon>
                  </v-fade-transition>
                </template>
              </v-text-field>
            </v-flex>
            <v-flex class="ml-4" xs6>
              <v-text-field outline clearable label="firstname" v-model="msg.firstname"
              type="firstname" :rules="[required]">
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-icon>account_box</v-icon>
                  </v-fade-transition>
                </template>
              </v-text-field>
            </v-flex>
          </v-layout>
          <br>
          <v-text-field outline clearable label="Email" v-model="msg.email"
          type="email" :rules="[required]">
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
          <br>
          <v-text-field outline clearable label="Purpose" v-model="msg.purpose"
          type="purpose" :rules="[required]">
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Enther the purpose of your message as title
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>notes</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-textarea outline clearable label="Message" v-model="msg.message"
          type="message" :rules="[required]">
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Enter the message to send to the FAQ
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>subject</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea>
          <div class="danger-alert" v-html="error"/>
          <v-btn large elevation-24 class="grey darken-1 mb-4 font-weight-bold" @click="sendFAQ">Send</v-btn>
        </form>
      </panel>
      <panel title="Message" v-if="isUserLoggedIn && !admin">
        <form>
          <br>
          <v-text-field outline clearable label="Purpose" v-model="msg.purpose"
          type="purpose" :rules="[required]">
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
                <v-icon>notes</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-textarea outline clearable label="Message" v-model="msg.message"
          type="message" :rules="[required]">
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
                <v-icon>subject</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea>
          <br>
          <div class="danger-alert" v-html="error"/>
          <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="sendUser">Send</v-btn>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import MessageService from "@/services/Message/MessageService";
import UserService from "@/services/User/UserService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      msg: {
        email: null,
        firstname: null,
        lastname: null,
        message: null,
        admin: false,
        user: false,
        faq: false,
        userid: 0,
        purpose: null
      },
      error: null,
      userview: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    formatted_date() {
      var result = "";
      var d = new Date();
      result +=
        d.getFullYear() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      return result;
    },
    async sendFAQ() {
      this.error = null;

      this.msg.faq = true;
      // Checking all filled
      const areAllFieldsFilledIn = Object.keys(this.msg).every(
        key => !!this.msg[key]
      );
      // if (!areAllFieldsFilledIn) {
      //   this.error = "Please fill in all the required fields.";
      //   return;
      // }

      // New date for the message
      const day = this.formatted_date();

      // Duplicate msg post
      const newMsg = {
        email: this.msg.email,
        firstname: this.msg.firstname,
        lastname: this.msg.lastname,
        message:
          this.msg.lastname +
          " " +
          this.msg.firstname +
          " " +
          day +
          ": \n" +
          this.msg.message +
          "\n\n",
        admin: this.msg.admin,
        user: this.msg.user,
        faq: this.msg.faq,
        date: day,
        userid: 0,
        purpose: this.msg.purpose
      };

      // post the message and delete older
      try {
        await MessageService.postNewMsg(newMsg);
        this.$router.push({ name: "home" });
      } catch (err) {
        console.log(err);
      }
    },
    async sendUser() {
      this.error = null;
      this.userview = (await UserService.getUser(this.user.id)).data;
      this.msg.user = true;
      this.msg.email = this.userview.email;
      this.msg.firstname = this.userview.firstname;
      this.msg.lastname = this.userview.lastname;
      this.msg.userid = this.userview.id;

      // Checking all filled
      const areAllFieldsFilledIn = Object.keys(this.msg).every(
        key => !!this.msg[key]
      );
      // if (!areAllFieldsFilledIn) {
      //   this.error = "Please fill in all the required fields.";
      //   return;
      // }

      // New date for the message
      const day = this.formatted_date();

      // Duplicate msg post
      const newMsg = {
        email: this.msg.email,
        firstname: this.msg.firstname,
        lastname: this.msg.lastname,
        message:
          this.msg.lastname +
          " " +
          this.msg.firstname +
          " " +
          day +
          ": \n" +
          this.msg.message +
          "\n\n",
        admin: this.msg.admin,
        user: this.msg.user,
        faq: this.msg.faq,
        date: day,
        userid: this.msg.userid,
        purpose: this.msg.purpose
      };
      // post the message and delete older
      try {
        await MessageService.postNewMsg(newMsg);
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}

.padding-input {
  margin-left: 32px;
}
</style>

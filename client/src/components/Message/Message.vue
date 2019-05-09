<template>
  <v-layout justify-center>
    <v-flex xs6 elevation-24>
      <panel title="Message FAQ" v-if="!isUserLoggedIn">
        <form>
          <br>
          <v-layout row>
            <v-flex xs6>
              <v-text-field label="lastname" v-model="msg.lastname"></v-text-field>
            </v-flex>
            <v-flex class="ml-2" xs6>
              <v-text-field label="firstname" v-model="msg.firstname"></v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field label="Email" v-model="msg.email"></v-text-field>
          <br>
          <v-text-field label="Purpose" v-model="msg.purpose"></v-text-field>
          <br>
          <v-textarea label="Message" v-model="msg.message"></v-textarea>
          <div class="danger-alert" v-html="error"/>
          <v-btn class="grey darken-1" @click="sendFAQ">Send</v-btn>
        </form>
      </panel>
      <panel title="Message" v-if="isUserLoggedIn && !admin">
        <form>
          <br>
          <v-text-field label="Purpose" v-model="msg.purpose"></v-text-field>
          <br>
          <v-textarea label="Message" v-model="msg.message"></v-textarea>
          <br>
          <div class="danger-alert" v-html="error"/>
          <v-btn class="grey darken-1" @click="sendUser">Send</v-btn>
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
</style>

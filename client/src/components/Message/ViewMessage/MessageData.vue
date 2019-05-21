<template>
  <panel v-if="isUserLoggedIn" title="View Message">
    <v-layout class="mt-5" column justify-center>
        <v-divider></v-divider>
        <v-flex xs10>
          <v-subheader
            v-if="message.date"
            :key="message.date"
          >{{ message.date }} from {{message.lastname}} {{message.firstname}} :</v-subheader>
          <v-list-tile :key="message.purpose">
            <v-list-tile-content>
              <v-list-tile-title>Purpose : {{message.purpose}} </v-list-tile-title>
              <v-list-tile v-html="message.message"></v-list-tile>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
        <v-divider></v-divider>
      <br>
      <br>
          <v-textarea outline clearable label="Message" v-model="msg.message"
          type="message" :rules="[required]">
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Enter the message to send
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>subject</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea>
      
      <v-layout justify-center>
        <v-btn  elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="sendMessage()">Send Message</v-btn>
      </v-layout>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import MessageService from "@/services/Message/MessageService";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      message: {},
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
      tmp: null,
      error: null,
      userview: null,
      required: value => !!value || "Required."
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  async mounted() {
    const messageId = this.route.params.messageId;
    this.message = (await MessageService.getMessage(messageId)).data;
  },
  methods: {
    formatted_date() {
      var result = "";
      var d = new Date();
      result +=
        d.getDate() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getFullYear() +
        " at" +
        d.getHours() +
        ":" +
        d.getMinutes();
      return result;
    },
    async sendMessage() {
      this.error = null;

      // get User
      this.userview = (await UserService.getUser(this.user.id)).data;
      console.log('user', this.user)
      console.log('userview', this.userview)
      console.log('message', this.message)
      if (this.message.user) {
        this.msg.user = true;
      } else if (this.message.faq) {
        this.msg.faq = true;
      } else {
        this.msg.admin = true;
      }
      this.msg.email = this.userview.email;
      this.msg.firstname = this.userview.firstname;
      this.msg.lastname = this.userview.lastname;
      this.msg.userid = this.userview.id;
      this.msg.purpose = this.message.purpose;

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

      // const oldMsgName = this.message.firstname + " " + this.message.lastname 
      // const oldMsg = this.message.date + " from " + name + " " + this.message.message
      const newMsgName = this.msg.firstname + " " + this.msg.lastname
      const newMsgSend = day + " from " + newMsgName + " " + this.msg.message
      // Duplicate msg post
      const newMsg = {
        email: this.msg.email,
        firstname: this.msg.firstname,
        lastname: this.msg.lastname,
        message: newMsgSend,
        admin: this.msg.admin,
        user: this.msg.user,
        faq: this.msg.faq,
        date: day,
        userid: this.msg.userid,
        purpose: this.msg.purpose
      };

      // post the message and delete older
      try {
        await MessageService.post(this.message.id, newMsg);
        try {
          this.message = (await MessageService.deleteMsgPost(this.message.id)).data;
          console.log(this.message)
          this.message = null;
        } catch (err) {
          console.log(err);
        }
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.message {
  padding: 20px;
  height: 200px;
  overflow: scroll;
}

.message-from {
  font-size: 25px;
}

.message-message {
  font-size: 20px;
}
</style>

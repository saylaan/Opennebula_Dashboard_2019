<template>
  <panel v-if="isUserLoggedIn" title="View Message">
    <v-layout class="mt-5" column justify-center>
      <v-flex xs10>
        <v-subheader
          v-if="message.date"
          :key="message.date"
        >{{ message.date }} from {{message.lastname}} {{message.firstname}} :</v-subheader>
        <v-list-tile :key="message.purpose">
          <v-list-tile-content>
            <v-list-tile-title>Purpose : {{message.purpose}}</v-list-tile-title>
            <v-list-tile v-html="message.message"></v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
      <v-divider></v-divider>
      <v-flex v-for="respmessage in respsmessage" :key="respmessage.date">
        <v-layout row align-center>
          <v-flex vxs10>
            <v-subheader
              v-if="respmessage.date"
              :key="respmessage.date"
            >{{ respmessage.date }} from {{respmessage.lastname}} {{respmessage.firstname}} :</v-subheader>
            <v-list-tile :key="respmessage.purpose">
              <v-list-tile-content>
                <v-list-tile v-html="respmessage.message"></v-list-tile>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-flex>
      <br>
      <br>
      <v-textarea
        outline
        clearable
        label="Message"
        v-model="msg.message"
        type="message"
        :rules="[required]"
      >
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
        <v-btn
          elevation-24
          large
          class="grey darken-1 mb-4 font-weight-bold"
          @click="sendMessage()"
        >Send Message</v-btn>
      </v-layout>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";
import MessageService from "@/services/Message/MessageService";
import RespMessageService from "@/services/Message/RespMessageService";
import RespService from "@/services/Message/RespService";

export default {
  data() {
    return {
      respsmessage: null,
      message: null,
      msg: {
        email: null,
        firstname: null,
        lastname: null,
        message: null,
        admin: false,
        user: false,
        faq: false,
        userid: 0,
        purpose: null,
        date: null
      },
      resp: null,
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
    this.respsmessage = (await RespMessageService.index({
      MessageId: messageId
    })).data;
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
        " at " +
        d.getHours() +
        ":" +
        d.getMinutes();
      return result;
    },
    async sendMessage() {
      this.userview = (await UserService.getUser(this.user.id)).data; // Get User
      if (this.message.user) {
        this.msg.user = true;
      } else if (this.message.faq) {
        this.msg.faq = true;
      }
      this.msg.email = this.userview.email;
      this.msg.firstname = this.userview.firstname;
      this.msg.lastname = this.userview.lastname;
      this.msg.userid = this.userview.id;
      this.msg.purpose = this.message.purpose;
      const day = this.formatted_date(); // New date for msg
      this.msg.date = day;
      // Checking all filled
      const areAllFieldsFilledIn = Object.keys(this.msg).every(
        key => !!this.msg[key]
      );
      // if (!areAllFieldsFilledIn) {
      //   this.error = "Please fill in all the required fields.";
      //   return;
      // }
      try {
        // post the message and delete older
        const messageId = this.route.params.messageId;
        this.resp = (await RespService.post(this.msg)).data;
        this.respsmessage = (await RespMessageService.post(messageId, this.resp.id)).data
        console.log(this.resp);
        console.log(this.respsmessage);
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

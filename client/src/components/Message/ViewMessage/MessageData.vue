<template>
  <panel v-if="isUserLoggedIn" title="View Message">
    <v-layout column justify-center>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs6>
            <h5 :class="`title font-weight-bold grey--text text--darken-3`">Lastname</h5>
          </v-flex>
          <v-flex xs6>
            <h5 :class="`title font-weight-bold grey--text text--darken-3`">Firstname</h5>
          </v-flex>
        </v-layout>
      </v-flex>
      <br>
      <br>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs6 class="message-lastname">
            <h5>{{message.lastname}}</h5>
          </v-flex>
          <v-flex xs6 class="message-firstname">
            <h5>{{message.firstname}}</h5>
          </v-flex>
        </v-layout>
      </v-flex>
      <br>
      <br>
      <br>
      <v-flex xs12 class="message-message">
        <h5>{{message.message}}</h5>
      </v-flex>
      <br>
      <br>
      <v-text-field
      label="Message"
      v-model="msg.message"
      type="message"
      :rules="[required]"
      xs12 class="message-message">
      </v-text-field>
      <v-flex xs6>
      <v-btn @click="sendMessage()" class="grey darken-1">Send Message</v-btn>
      </v-flex>
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
      msg: {
        email: null,
        firstname: null,
        lastname: null,
        message: null,
        admin: false,
        user: false,
        faq: false,
        userid: 0
      },
      error: null,
      userview: null,
      required: value => !!value || "Required."
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  props: ["message"],
  methods: {
    formatted_date() {
      var result = ""
      var d = new Date()
      result += d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()
      return (result)
    },
    async sendMessage() {
      this.error = null

      // get User
      this.userview = (await UserService.getUser(this.user.id)).data
      if (this.message.user) {
        this.msg.user = true
      } else if (this.message.faq) {
        this.msg.faq = true
      } else {
        this.msg.admin = true
      }
      this.msg.email = this.userview.email
      this.msg.firstname = this.userview.firstname
      this.msg.lastname = this.userview.lastname
      this.msg.userid = this.userview.id

      // Checking all filled
      const areAllFieldsFilledIn = Object.keys(this.msg).every(
        key => !!this.msg[key]
      );
      // if (!areAllFieldsFilledIn) {
      //   this.error = "Please fill in all the required fields.";
      //   return;
      // }

      // New date for the message
      const day = this.formatted_date()

      // Duplicate msg post
      const newMsg = {
        "email": this.msg.email,
        "firstname": this.msg.firstname,
        "lastname": this.msg.lastname,
        "message": this.message.lastname + ' ' + this.message.firstname + ' ' +
        this.message.createdAt + ': \n\n' + this.message.message + '\n\n' +
        this.msg.lastname + ' ' + this.msg.firstname + ' ' + day + ': \n' +
        this.msg.message + '\n\n',
        "admin": this.msg.admin,
        "user": this.msg.user,
        "faq": this.msg.faq,
        "date": day,
        "userid": this.msg.userid
      }

      // post the message and delete older
      try {
        await MessageService.post(this.message.id, newMsg)
        try {
          this.message = await MessageService.deleteMsgPost(this.message.id)
          this.message = null
        } catch (err) {
          console.log(err)
        }
        this.$router.push({name: "dashboard"})
      } catch (err) {
        console.log(err)
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

.message-lastname {
  font-size: 20px;
}

.message-firstname {
  font-size: 20px;
}

.message-message {
  font-size: 25px;
}
</style>

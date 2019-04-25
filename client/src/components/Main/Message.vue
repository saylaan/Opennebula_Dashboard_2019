<template>
  <v-layout justify-center>
    <v-flex xs6 elevation-24>
      <panel title="Message FAQ" v-if="!isUserLoggedIn">
        <form>
          <br>
          <v-layout row>
            <v-flex xs6>
              <v-text-field label="lastname" v-model="lastname"></v-text-field>
            </v-flex>
            <v-flex class="ml-2" xs6>
              <v-text-field label="firstname" v-model="firstname"></v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <br>
          <v-textarea label="Message" v-model="msg"></v-textarea>
          <div class="danger-alert" v-html="error"/>
          <v-btn class="grey darken-1" @click="sendFAQ">Send</v-btn>
        </form>
      </panel>
      <panel title="Message" v-if="isUserLoggedIn && !admin">
        <form>
          <br>
          <v-textarea label="Message" v-model="msg"></v-textarea>
          <br>
          <v-text-field label="Purpose" v-mode="purpose"></v-text-field>
          <br>
          <div class="danger-alert" v-html="error"/>
          <v-btn class="grey darken-1" @click="sendUser">Send</v-btn>
        </form>
      </panel>
      <panel title="Message" v-if="isUserLoggedIn && admin">
        <form>
          <br>
          <v-textarea label="Message" v-model="msg"></v-textarea>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      lastname: null,
      firstname: null,
      email: null,
      msg: null,
      purpose: null,
      error: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    sendFAQ() {
      this.error = null;
    },
    sendUser() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>

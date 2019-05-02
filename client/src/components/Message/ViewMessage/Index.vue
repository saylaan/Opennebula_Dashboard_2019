<template>
  <v-layout row justify-center v-if="isUserLoggedIn">
      <v-flex xs6>
        <message-data :message="message"/>
      </v-flex>
  </v-layout>
</template>

<script>
import MessageData from "./MessageData";
import { mapState } from "vuex";
import MessageService from "@/services/Message/MessageService";

export default {
  data() {
    return {
      message: {}
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route", "admin"])
  },
  async mounted() {
    const messageId = this.route.params.messageId
    this.message = (await MessageService.getMessage(messageId)).data
  },
  components: {
    MessageData
  }
};
</script>

<style>
</style>

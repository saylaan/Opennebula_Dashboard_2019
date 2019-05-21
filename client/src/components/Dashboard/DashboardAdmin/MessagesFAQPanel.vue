<template>
  <panel v-if="isUserLoggedIn && admin" title="Message FAQ">
    <v-flex v-for="message in messages" :key="message.date" class="email">
      <v-layout row align-center>
        <v-flex xs10>
          <v-subheader
            v-if="message.date"
            :key="message.date"
          >{{ message.date }} from {{message.lastname}} {{message.firstname}} :</v-subheader>
          <v-list-tile :key="message.purpose">
            <v-list-tile-content>
              <v-list-tile-title> {{message.purpose}} :</v-list-tile-title>
              <v-list-tile-sub-title v-html="message.message"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
        <v-flex xs2>
          <v-layout align-center column>
            <v-flex>
              <v-icon
                large
                @click="answerMsg({name: 'message-view', params: {
                        messageId: message.id
                      }})"
              >create</v-icon>
            </v-flex>
            <v-flex>
              <v-icon large @click="deleteMsg(message.id)">delete_sweep</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-flex>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import MessageService from "@/services/Message/MessageService";

export default {
  data() {
    return {
      messages: null,
      result: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  methods: {
    async deleteMsg(messageId) {
      try {
        this.result = await MessageService.deleteMessage(messageId);
        this.result = null;
        this.messages = (await MessageService.index(1)).data;
      } catch (err) {
        console.log(err);
      }
    },
    async answerMsg(route) {
      this.$router.push(route)
    }
  },
  async mounted() {
    this.messages = (await MessageService.index(1)).data;
    // console.log('mounted message from faq dashboard', this.messages)
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.messages = (await MessageService.index(1)).data;
        // console.log('watch message from faq dashboard', this.messages)
      }
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <panel v-if="isUserLoggedIn" title="Message Admin">
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
import MessageUserService from "@/services/Message/MessageUserService";
import MessageService from "@/services/Message/MessageService";

export default {
  data() {
    return {
      messages: null,
      result: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route"])
  },
  methods: {
    async deleteMsg(messageId) {
      try {
        this.result = await MessageUserService.delete(messageId);
        this.result = await MessageService.deleteMessage(messageId);
        this.messages = (await MessageUserService.index()).data;
      } catch (err) {
        console.log(err);
      }
    },
    async answerMsg(route) {
      this.$router.push(route)
    }
  },
  async mounted() {
    this.messages = (await MessageUserService.index()).data;
  },
  watch: {
    "$route.query.find": {
      immediate: true,
      async handler() {
        this.messages = (await MessageUserService.index()).data;
      }
    }
  }
};
</script>

<style scoped>
.message {
  padding: 20px;
  height: 200px;
  overflow: scroll;
}

.message-firstname {
  font-size: 20px;
}

.message-lastname {
  font-size: 20px;
}

.message-message {
  font-size: 18px;
}
</style>

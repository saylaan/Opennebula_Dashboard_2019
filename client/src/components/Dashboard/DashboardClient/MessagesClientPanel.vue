<template>
  <panel v-if="isUserLoggedIn" title="Message from admin">
    <v-flex xs12>
      <v-layout column>
        <v-layout row align-center>
          <v-flex xs2>
            <h5 :class="`title font-weight-bold grey--text text--darken-3`">Lastname</h5>
          </v-flex>
          <v-flex class="ml-2" xs2>
            <h5 :class="`title font-weight-bold grey--text text--darken-3`">Firstname</h5>
          </v-flex>
          <v-flex xs6>
            <h5 :class="`title font-weight-bold grey--text text--darken-3`">Message</h5>
          </v-flex>
          <v-flex xs2></v-flex>
        </v-layout>
        <v-flex v-for="message in messages" :key="message.message" class="email">
          <v-layout align-center row>
            <v-flex xs2 class="message-lastname">
              <h5>{{message.lastname}}</h5>
            </v-flex>
            <v-flex xs2 class="message-firstname">
              <h5>{{message.firstname}}</h5>
            </v-flex>
            <v-flex xs6 class="message-message">
              <h5>{{message.createdAt}} : {{message.message}}</h5>
            </v-flex>
            <v-flex xs2>
              <v-layout align-center column>
                <v-flex>
                  <v-btn
                    :to="{name: 'message-view', params: {
                        messageId: message.id
                      }}"
                    class="grey darken-1"
                  >Reply</v-btn>
                </v-flex>
                <v-flex>
                  <v-btn class="grey darken-1" @click="deleteMsg(message.id)">Delete</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
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
    ...mapState(["isUserLoggedIn", "user"])
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

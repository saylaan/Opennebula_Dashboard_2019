<template>
  <v-layout>
    <panel v-if="isUserLoggedIn" title="Message from client">
     <v-layout row>
        <v-flex xs9>
          <v-layout column>
            <v-flex v-for="message in messages" :key="message.email" class="email">
              <v-layout row>
                <v-flex xs6 class="message-lastname">
                  <h5>name : {{message.lastname}}</h5>
                </v-flex>
                <v-flex xs6 class="message-firstname">
                  <h5>{{message.firstname}}</h5>
                </v-flex>
                <v-flex xs12 class="message-msg">
                  <h5>{{message.message}}</h5>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs3>
          <v-layout column>
          <v-flex>
             <v-btn :to="{name: 'message'}"
               class="grey darken-1"
             >Reply</v-btn>
           </v-flex>
           <v-flex>
             <v-btn
               class="grey darken-1"
             >Delete</v-btn>
           </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </panel>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import MessageService from "@/services/Message/MessageService";

export default {
  data() {
    return {
      messages: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
    this.messages = await MessageService.indexCli().data;
  },
  watch: {
    immediate: true,
    async handler() {
      this.messages = await MessageService.indexCli().data;
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

.message-lastname {
  font-size: 20px;
}

.message-firstname {
  font-size: 20px;
}

.message-message {
  font-size: 18px;
}
</style>

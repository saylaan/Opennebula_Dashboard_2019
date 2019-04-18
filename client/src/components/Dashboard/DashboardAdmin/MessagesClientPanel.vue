<template>
  <v-layout>
    <panel v-if="isUserLoggedIn" title="Message from client">
      <v-layout row>
        <v-flex>
          <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceau</p>
        </v-flex>
        <v-flex xs3>
          <v-layout column>
            <v-flex>
              <v-btn class="grey darken-1">Reply</v-btn>
              <!-- TODO : MAKE A ROUTE TO REPLY -->
            </v-flex>
            <v-flex>
              <v-btn class="grey darken-1">Delete</v-btn>
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
    this.messages = await MessageService.index().data;
  },
  watch: {
    immediate: true,
    async handler() {
      this.messages = await MessageService.index().data;
    }
  }
};
</script>

<style scoped>
</style>

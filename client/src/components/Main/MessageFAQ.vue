<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Message FAQ">
        <form>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <br>
          <v-textarea label="Message" v-model="msg"></v-textarea>
          <div class="danger-alert" v-html="error"/>
          <v-btn class="grey darken-1" @click="send">Send</v-btn>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
// TODO :  make the send message to the database
export default {
  data() {
    return {
      email: null,
      msg: null,
      error: null
    };
  },
  methods: {
    send() {}
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>

<template>
    <v-layout wrap>
        <v-flex xs6 offset-xs3>
              <panel title="Message FAQ">
                <form>
                    <v-text-field label='Email' v-model="email"></v-text-field><br>
                    <v-textarea label="Message" v-model="msg"></v-textarea>
                    <div class="error" v-html="error"/>
                    <v-btn class="purple" @click="send" dark>Send</v-btn>
                </form>
              </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'

// TODO :  make the send message to the database
export default {
  data () {
    return {
      email: null,
      msg: null,
      error: null
    }
  },
  methods: {
    send () {}
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

.error {
    color: red;
}

</style>

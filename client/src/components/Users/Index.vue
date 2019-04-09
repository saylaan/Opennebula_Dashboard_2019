<template>
  <v-layout v-if="isUserLoggedIn" column justify-center>
    <v-flex xs12>
      <Users-search-panel/>
    </v-flex>
    <v-flex xs12>
      <users-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UsersPanel from "./ItemUser/UsersPanel";
import UsersSearchPanel from "./ItemUser/UsersSearchPanel";

export default {
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
  },
  components: {
    UsersPanel,
    UsersSearchPanel
  },
  props: {
    main: {
      type: Object
    }
  }
};
</script>

<style scoped>
</style>

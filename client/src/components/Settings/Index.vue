<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3 v-if="isUserLoggedIn">
      <settings-panel/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import SettingsPanel from './ItemSetting/SettingsPanel'

export default {
  data() {
    return {
      vlabs: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
  },
  components: {
    SettingsPanel
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

<template>
  <v-layout v-if="isUserLoggedIn"  wrap>
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
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  async mounted() {
  },
  components: {
    SettingsPanel
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <v-layout class="mt-5" v-if="isUserLoggedIn" justify-center>
    <v-flex xs6 v-if="isUserLoggedIn">
      <settings-panel/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import SettingsPanel from "./ItemSetting/SettingsPanel";

export default {
  data() {
    return {
      vlabs: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  async mounted() {},
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

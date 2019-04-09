<template>
  <panel v-if="isUserLoggedIn" title="Search">
    <v-text-field label="Search by company, name, days left" v-model="search"></v-text-field>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      search: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "vlabs"
      };
      if (this.search !== "") {
        route.query = {
          search: this.search
        };
      }
    }, 700),
    "$route.query.search": {
      immediate: true,
      handler(value) {
        this.search = value;
      }
    }
  }
};
</script>

<style>
</style>

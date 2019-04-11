<template>
  <panel v-if="isUserLoggedIn && admin" title="Search">
    <v-text-field label="Search by company, name" v-model="find"></v-text-field>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      find: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin"])
  },
  watch: {
    find: _.debounce(async function(value) {
      const route = {
        name: "users"
      };
      if (this.find !== "") {
        route.query = {
          find: this.find
        };
      }
      this.$router.push(route);
    }, 700),
    "$route.query.find": {
      immediate: true,
      handler(value) {
        this.find = value;
      }
    }
  }
};
</script>

<style>
</style>

<template>
  <panel title="Search">
    <v-text-field label="Search by company, name, days left" v-model="search"></v-text-field>
  </panel>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      search: null
    };
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

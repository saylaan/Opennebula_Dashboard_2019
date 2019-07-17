<template>
  <v-layout class="white elevation-2" column>
    <v-flex elevation-12>
      <v-toolbar class="grey lighten-1" flat dense>
        <v-toolbar-title class="headline font-weight-bold" >
          <!-- <v-btn fab small>
          <v-icon large @click="$router.go(-1)">
            undo
          </v-icon>
          </v-btn> -->
          {{title}}</v-toolbar-title>
        <slot name="action"/>
      </v-toolbar>
    </v-flex>
    <v-flex class="pl-4 pr-4 pt-2 pb-2">
      <slot>No slot content defined.</slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
.v-toolbar {
  opacity: 0.8;
}

.v-flex {
  background-color: #ddd7e5;
}
</style>

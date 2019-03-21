<template>
  <div class="white elevation-2">
    <v-toolbar class="purple lighten-1" flat dense dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="action"/>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2" dark>
      <slot>
        No slot content defined.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // title: 'Hello world'
    }
  },
  methods: {
  },
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>

<template>
  <panel title="Vlab user logs">
    <v-data-table
      :headers:="headers"
      :pagination.sync="pagination"
      :items="vlablogs">
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.name}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import VlabUserLogService from '@/services/VlabUserLogService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'VlabName',
          value: 'title'
        },
        {
          text: 'CompanyName',
          value: 'name'
        }
      ],
      pagination: {
        sortBy: 'data',
        descending: true
      },
      vlablog: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.vlablog = (await VlabUserLogService.index({
        userId: this.user.id
      })).data
    }
  }
}
</script>

<style>

</style>

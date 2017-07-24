<template lang="pug">
div#info
  label status: {{ status }}
    button#change-status {{ buttonLabel }}
  table(border=1)
    tr(v-for='(val, key) in pageInfo')
      td {{ key }}
      td {{ val }}
</template>

<script>
/* @flow */
export default {
  name: 'info',
  data () {
    return {
      pageInfo: JSON.parse(document.getElementById('info').getAttribute('data'))
    }
  },
  computed: {
    activation: function () {
      if (this.pageInfo.status === 'OFF') {
        return false
      }
      return true
    },
    status: function () {
      if(this.activation) {
        return 'ON'
      }
      return 'OFF'
    },
    buttonLabel: function () {
      if (this.activation) {
        return 'Disble'
      }
      return 'Enable'
    }
  }
}
</script>

<style>
button {
  margin: 5px;
}
</style>

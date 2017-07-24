<template lang="pug">
div#info
  button#change-status Activation
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
  }
}
</script>

<style>
button {
  margin: 5px;
}
</style>

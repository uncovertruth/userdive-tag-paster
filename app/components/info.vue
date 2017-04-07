<template lang="jade">
table(border=1)
  tr(v-for='(val, key) in data')
    td {{ val }}
    td {{ key }}
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      data: JSON.parse(document.getElementById('info').getAttribute('data'))
    }
  }
}
</script>

<style lang="css">
</style>

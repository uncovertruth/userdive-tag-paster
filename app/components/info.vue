<template lang="pug">
table(border=1)
  tr(v-for='(val, key) in pageInfo')
    td {{ val }}
    td {{ key }}
</template>

<script>
export default {
  name: 'info',
  props: ['pageInfo']
}
</script>

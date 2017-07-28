<template lang='pug'>
div#info
  table
    tr(v-for='(val, key) in pageInfo')
      td {{ key }}
      td {{ val }}
  button(v-on:click='changeStatus')
    | Turn {{ pageInfo.status === 'OFF' ? 'ON': 'OFF' }}
</template>

<script>
/* @flow */
export default {
  name: 'info',
  props: ['pageInfo'],
  methods: {
    changeStatus: function () {
      this.$parent.$emit('changeStatus')
    }
  }
}
</script>

<style lang='scss'>
#info {
  width: 350px;
  button {
    padding: 5px 10px;
    background-color: #ddd;
    box-shadow: none;
    border: none;
    margin: 5px;
    font-size: 14px;
    float: right;
  }

  table {
    width: 320px;

    td {
      border-bottom: solid 1px #ccc;
      font-size: 13px;
    }
  }
}
</style>

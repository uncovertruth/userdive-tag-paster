<template lang='pug'>
div#info
  table
    tr(v-for='(val, key) in pageInfo')
      td {{ key }}
      td {{ val }}
  button#change-status Turn {{ buttonLabel }}
</template>

<script>
/* @flow */
export default {
  name: 'info',
  data () {
    return {
      pageInfo: {}
    }
  }
  // computed: {
  //   isActive: function () {
  //     if (this.pageInfo.status === 'OFF') {
  //       return false
  //     }
  //     return true
  //   },
  //   buttonLabel: function () {
  //     if (this.isActive) {
  //       return 'OFF'
  //     }
  //     return 'ON'
  //   }
  // }
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

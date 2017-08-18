<template lang='pug'>
#info
  table
    tr(v-for='(val, key) in data')
      td {{ key }}
      td {{ val }}
  button(v-on:click='changeStatus')
    | Turn {{ data.status === 'active' ? 'ON' : 'OFF' }}
</template>

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

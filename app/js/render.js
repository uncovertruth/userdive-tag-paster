/* @flow */
/* eslint no-new: 0 */
'use strict'
import Vue from 'vue'
import Info from '../components/info'

export default (userData, callback) => {
  const vm = new Vue({
    el: '#info',
    render: h => h(Info)
  })
  // vm.$set(vm.data, 'pageInfo', userData)
  // vm.$set(vm.data.pageInfo, 'honya', 'gorogoro')
  console.log(vm.$data)
  global.vm = vm
  vm.pageInfo = { honya: 'mrorake' }
  if (callback) callback(vm)
}

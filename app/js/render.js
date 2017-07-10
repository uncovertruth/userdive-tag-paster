/* @flow */
'use strict'
import Vue from 'vue'
import Info from '../components/info'

export default callback => {
  const vm = new Vue({
    el: '#info',
    render: h => h(Info)
  })
  if (callback) callback(vm)
}

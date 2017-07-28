/* @flow */
/* eslint no-new: 0 */
'use strict'
import Vue from 'vue'
import Info from '../components/info'

export default (userData, callback) => {
  const vm = new Vue({
    el: '#info',
    render: h => h(
      Info,
      {
        props: {
          pageInfo: userData
        }
      }
    )
  })
  if (callback) callback(vm)
}

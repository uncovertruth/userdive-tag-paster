/* @flow */
'use strict'
import Vue from 'vue'
import Info from '../components/info'

export default (userData: object, onClick: Function) => {
  const vm = new Vue({
    el: '#info',
    methods: {},
    render: h => {
      return h(
        Info,
        {
          props: {
            pageInfo: userData
          }
        }
      )
    }
  })
  vm.$on('changeStatus', () => onClick())
}

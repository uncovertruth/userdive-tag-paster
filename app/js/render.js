/* @flow */
/* eslint no-new: 0 */
'use strict'
import Vue from 'vue'
import Info from '../components/info'

export default onClick => {
  const vue = new Vue({
    el: '#info',
    render: h => h(Info)
  })
  vue.el('change-status').$on('click', () => onClick)
}

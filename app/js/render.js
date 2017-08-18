/* @flow */
import Vue from 'vue'
import template from '../components/info'

export default (data: Object, onClick: Function) => {
  const vm = new Vue({
    name: 'info',
    el: '#info',
    template,
    data,
    methods: {
      changeStatus: function () {
        this.$parent.$emit('changeStatus')
      }
    }
  })
  vm.$on('changeStatus', onClick)

  return vm
}

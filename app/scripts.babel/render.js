/* @flow */
/* eslint no-new:0 */
'use strict';
import Vue from 'vue';
import Info from '../components/info';

module.exports = () => {
  new Vue({
    el: '#info',
    render: h => h(Info)
  });
};

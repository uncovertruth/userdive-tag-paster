/* @flow */
/* eslint no-new:0 */
'use strict';
import Vue from 'vue';
import Info from '../components/info';

export default (callback) => {
  new Vue({
    el: '#info',
    render: h => h(Info)
  });
  if (callback) callback();
};

/* @flow */
// import assert from 'assert';
import assert from 'assert';
import Vue from 'vue';
import Info from '../app/components/info.vue';

declare var describe: any;
declare var it: any;

describe('Vue unit test', () => {
  it('should get strings from by props', (done) => {
    const vm = new Vue(Info).$mount();
    vm.pageInfo = {'test': 'key'};
    Vue.nextTick(() => {
      assert(vm.$el.textContent === {'test': 'key'});
      done();
    });
  });
});

/* @flow */
// import assert from 'assert';
import assert from 'assert';
import { describe, it } from 'mocha';
import Vue from 'vue';
import Info from '../app/components/info.vue';

describe('Vue unit test', () => {
  function getRenderedText (Component, propsData) {
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({propsData}).$mount();
    return vm.$el.textContent;
  }

  it('should get strings from by props', (done) => {
    const data = {test: 'This is a test'};
    const text = getRenderedText(Info, data);
    assert(text === 'This is a test');
  });
});

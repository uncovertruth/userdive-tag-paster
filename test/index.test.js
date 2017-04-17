/* @flow */
import assert from 'assert';
import Vue from 'vue';
import Render from '../app/scripts.babel/render';
import Info from '../app/components/info.vue';

declare var describe: any;
declare var it: any;
declare var before: any;
declare var beforeEach: any;
declare var afterEach: any;
declare var fixture: any;

describe('Vue unit test', () => {
  const testData = {'key': 'value'};

  before(() => {
    fixture.setBase('test/fixture');
  });

  beforeEach(() => {
    fixture.load('info.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should get object', (done) => {
    const vm = new Vue(Info).$mount();
    Vue.nextTick(() => {
      assert(JSON.parse(vm.pageInfo) === testData);
      done();
    });
  });

  it('should render', (done) => {
    Render(testData, () => {
      done();
    });
  });
});

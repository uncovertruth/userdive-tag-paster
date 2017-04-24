/* @flow */
import assert from 'assert';
import Render from '../app/scripts.babel/render';

declare var describe: any;
declare var it: any;
declare var beforeEach: any;
declare var fixture: any;

describe('Vue unit test', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test.html'];
  });

  it('should render', (done) => {
    Render(() => {
      const dom = document.getElementsByTagName('td')[0];
      assert(dom);
      assert.equal(dom.innerText, 'key');
      done();
    });
  });
});

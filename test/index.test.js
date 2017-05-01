/* @flow */
import assert from 'assert';
import Render from '../app/scripts.babel/render';

declare var describe: any;
declare var it: any;
declare var before: any;
declare var __html__: any;

describe('Vue unit test', () => {
  before(() => {
    document.body.innerHTML = __html__['test.html'];
  });

  it('should render dom', (done) => {
    Render(() => {
      // const dom = document.getElementsByTagName('td')[0];
      assert(document.getElementById('info'));
      // assert.equal(dom.innerText, 'key');
      done();
    });
  });
});

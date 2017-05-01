/* @flow */
import assert from 'power-assert';
import Render from '../app/scripts.babel/render';

declare var describe: any;
declare var it: any;
declare var before: any;

describe('Vue unit test', () => {
  before(() => {
    document.body.innerHTML = window.__html__['fixtures/test.html'];
    Render();
  });

  it('should render dom', () => {
    const dom = document.getElementsByTagName('td')[0];
    assert.equal(dom.innerHTML, 'key');
  });
});

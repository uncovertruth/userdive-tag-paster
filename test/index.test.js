/* @flow */
import { describe, it, before } from 'mocha'
import assert from 'assert'

import Render from '../app/js/render'

describe('Vue unit test', () => {
  before(() => {
    document.body.innerHTML = window.__html__['test/fixtures/test.html']
    Render()
  })

  it('should render dom', () => {
    const dom = document.getElementsByTagName('td')[0]
    assert.equal(dom.innerHTML, 'key')
  })
})

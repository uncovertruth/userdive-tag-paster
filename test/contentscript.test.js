/* @flow */
import { describe, it, before, beforeEach } from 'mocha'
import assert from 'assert'

import '../app/js/contentscript'

declare var content: Class

function setChromeobject (): void {
  window.chrome = {
    runtime: {
      sendMessage: (message, res) => {
        switch (message.bg) {
          case 'isActive':
            res({ isActive: 'active' })
            break
        }
      }
    }
  }
}

describe('contentscript', () => {
  before(() => {
    setChromeobject()
  })
  beforeEach(() => {
    document.body.innerHTML = window.__html__['']
  })

  function injectTag (): void {
    const tag = content.createTag(
      'tag-id',
      'tag-test-host-name',
      'env',
      content.id
    )
    content.injectScript(tag)
  }

  it('should inject tag', () => {
    injectTag()
    assert(document.getElementById(content.id))
  })

  it('should Blocked USERDIVE', done => {
    injectTag()
    setTimeout(() => {
      const tag = document.getElementById(content.id)
      const state = JSON.parse(tag.getAttribute(content.stateName))
      assert.equal(state.status, 'Blocked')
      done()
    }, 3000)
  })

  function injectTagWithState (state: object): void {
    content.injectScript(content.createTag('', '', '', ''))
    const tag = document.getElementById(content.id)
    tag.setAttribute(content.stateName, JSON.stringify(state))
  }

  it('should load state when USERDIVE working', done => {
    injectTagWithState({ pageId: 1 })
    setTimeout(() => {
      content
        .loadState()
        .then(data => {
          assert(data)
          assert.equal(data.pageId, 1)
          done()
        })
        .catch(err => {
          assert(!err)
          done()
        })
    }, 500)
  })

  it('must not load state when tag not exist', done => {
    setTimeout(() => {
      content.loadState().catch(err => {
        assert(err)
        assert(err.message, 'Ignored')
        done()
      })
    }, 500)
  })
})

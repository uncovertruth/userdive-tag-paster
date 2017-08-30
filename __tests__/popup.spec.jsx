/* @flow */
/** @jsx h */
import 'jest'
import { h } from 'preact'
import chrome from 'sinon-chrome'
import { mount } from 'enzyme'

import Popup from '../app/components/popup'

describe('popup', () => {
  const body: any = document.body

  beforeEach(() => {
    body.innerHTML = ''
    global.chrome = chrome
  })

  afterEach(function () {
    chrome.flush()
    delete global.chrome
  })

  function wrappeComponent (data = {}) {
    const wrapper = mount(<Popup {...{ data }} />)
    return wrapper
  }

  test('vaild id', () => {
    const wrapper = wrappeComponent({ test: 'test' })
    expect(wrapper.find('tr'))
  })

  test('toggle', () => {
    const wrapper = wrappeComponent({ test: 'test' })
    wrapper.find('button').simulate('click')
  })
})

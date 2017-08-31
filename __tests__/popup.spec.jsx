/* @flow */
/** @jsx h */
import 'jest'
import { h } from 'preact'
import { mount } from 'enzyme'

import Popup from '../app/components/popup'

describe('popup', () => {
  function wrappeComponent (data = {}) {
    const wrapper = mount(<Popup {...{ data }} />)
    return wrapper
  }

  test('vaild id', () => {
    const wrapper = wrappeComponent({ test: 'test' })
    setTimeout(() => {
      expect(wrapper.find('tr'))
    })
  })

  test('toggle', () => {
    const wrapper = wrappeComponent({ test: 'test' })
    setTimeout(() => {
      wrapper.find('button').simulate('click')
    })
  })
})

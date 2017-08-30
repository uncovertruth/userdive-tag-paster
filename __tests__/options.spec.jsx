/* @flow */
/** @jsx h */
import 'jest'
import { h } from 'preact'
import { random } from 'faker'
import { mount } from 'enzyme'

import Options from '../app/components/options'

describe('options', () => {
  const id = random.alphaNumeric(10)
  const data = {
    id,
    env: random.alphaNumeric(10),
    host: random.alphaNumeric(15),
    ignore: random.alphaNumeric(10)
  }

  function wrappeComponent (data = {}) {
    const wrapper = mount(<Options {...data} />)
    return wrapper
  }

  test('vaild configs', () => {
    const wrapper = wrappeComponent(data)
    setTimeout(() => {
      expect(wrapper.props().id).toEqual(id)
    }, 10)
  })

  test('no configs', () => {
    const wrapper = wrappeComponent()
    setTimeout(() => {
      expect(wrapper.props().id).toEqual(undefined)
    }, 10)
  })
})

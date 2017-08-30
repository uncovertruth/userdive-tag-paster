/* @flow */
/** @jsx h */
import 'jest'
import { h } from 'preact'
import { random } from 'faker'
import chrome from 'sinon-chrome'
import { mount } from 'enzyme'

import Options from '../app/components/options'

describe('options', () => {
  const body: any = document.body
  const id = random.alphaNumeric(10)
  const data = {
    id,
    env: random.alphaNumeric(10),
    host: random.alphaNumeric(15),
    ignore: random.alphaNumeric(10)
  }

  beforeEach(() => {
    body.innerHTML = ''
    global.chrome = chrome
  })

  afterEach(function () {
    chrome.flush()
    delete global.chrome
  })

  function wrappeComponent (data = {}) {
    const wrapper = mount(<Options {...data} />)
    return wrapper
  }

  test('vaild configs', () => {
    const wrapper = wrappeComponent(data)
    expect(wrapper.props().id).toEqual(id)
  })

  test('no configs', () => {
    const wrapper = wrappeComponent()
    expect(wrapper.props().id).toEqual(undefined)
  })
})

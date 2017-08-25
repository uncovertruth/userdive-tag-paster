/* @flow */
/** @jsx h */
import 'jest'
import TestUtils from 'react-dom/test-utils'
import { h } from 'preact'

jest.unmock('../app/components/popup')
import Popup from '../app/components/popup' // eslint-disable-line import/first

describe('popup', () => {
  function render (data) {
    const instance = TestUtils.renderIntoDocument(<Popup {...data} />)
    return instance
  }

  test('vaild id', () => {
    render({ test: 'test' })
  })
})

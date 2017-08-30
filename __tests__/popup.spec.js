/* @flow */
/** @jsx h */
/* eslint import/first: 0 */
import 'jest'
import { h } from 'preact'

jest.unmock('preact-render-to-string')
import render from 'preact-render-to-string'
import Popup from '../app/components/popup'

describe('popup', () => {
  test('vaild id', () => {
    const data = { test: 'test' }
    const Component = () => <Popup {...{ data }} />
    const html = render(<Component />)
    document.body.innerHTML = html
    const th = document.getElementsByTagName('th')[0]
    expect(th.innerHTML).toBe('test')
  })
})

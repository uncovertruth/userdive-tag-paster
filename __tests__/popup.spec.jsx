/* @flow */
/** @jsx h */
/* eslint import/first: 0 */
import 'jest'
import { h, render } from 'preact'

import Popup from '../app/components/popup'

describe('popup', () => {
  const body: any = document.body

  function renderComponent (data: Object) {
    render(<Popup {...{ data }} />, body)
  }

  test('vaild id', () => {
    const data = { test: 'test' }
    renderComponent(data)

    const th: any = body.getElementsByTagName('th')[0]
    expect(th.innerHTML).toBe('test')
  })
})

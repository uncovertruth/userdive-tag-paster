/* @flow */
/** @jsx h */
import 'jest'
import { h, render } from 'preact'
import chrome from 'sinon-chrome'

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

  function renderComponent (data: Object) {
    render(<Popup {...{ data }} />, body)
  }

  test('vaild id', () => {
    renderComponent({ test: 'test' })

    const th: any = body.getElementsByTagName('th')[0]
    expect(th.innerHTML).toBe('test')
  })

  test('toggle', () => {
    renderComponent({ test: 'test' })

    const button = body.getElementsByTagName('button')[0]
    button.click()
  })
})

/* @flow */
/** @jsx h */
import 'jest'
import { h, render } from 'preact'
import { random } from 'faker'
import chrome from 'sinon-chrome'

import Options from '../app/components/options'

describe('options', () => {
  const body: any = document.body

  beforeEach(() => {
    body.innerHTML = ''
    global.chrome = chrome
  })

  afterEach(function () {
    chrome.flush()
    delete global.chrome
  })

  function renderComponent (data) {
    render(<Options {...data} />, body)
  }

  test('vaild configs', () => {
    const id = random.alphaNumeric(10)
    const configs = {
      id,
      env: random.alphaNumeric(10),
      host: random.alphaNumeric(15),
      ignore: random.alphaNumeric(10)
    }
    renderComponent(configs)

    const th = body.getElementsByTagName('input')[0]
    expect(th.value).toBe(id)
  })

  test('no configs', () => {
    renderComponent()
    const th = document.getElementsByTagName('input')[0]
    expect(th.value).toBe('')
  })

  test('onSave', () => {
    const configs = {
      id: random.alphaNumeric(10),
      env: random.alphaNumeric(10),
      host: random.alphaNumeric(15),
      ignore: random.alphaNumeric(10)
    }
    renderComponent(configs)

    const button = body.getElementsByTagName('button')[0]
    button.click()
  })
})

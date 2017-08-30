/* @flow */
/** @jsx h */
/* eslint import/first: 0 */
import 'jest'
import { h, render } from 'preact'
import { random } from 'faker'

import Options from '../app/components/options'

describe('options', () => {
  const body: any = document.body

  beforeEach(() => {
    body.innerHTML = ''
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
})

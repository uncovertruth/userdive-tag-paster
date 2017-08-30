/* @flow */
/** @jsx h */
/* eslint import/first: 0 */
import 'jest'
import { h } from 'preact'
import { random } from 'faker'

jest.unmock('preact-render-to-string')
import render from 'preact-render-to-string'
import Options from '../app/components/options'

describe('options', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  function renderComponent (component) {
    const dom = render(component)
    document.body.innerHTML = dom
  }

  test('vaild configs', () => {
    const id = random.alphaNumeric(10)
    const data = {
      id,
      env: random.alphaNumeric(10),
      host: random.alphaNumeric(15),
      ignore: random.alphaNumeric(10)
    }
    const Component = () => <Options {...data} />
    renderComponent(<Component />)
    const th = document.getElementsByTagName('input')[0]
    expect(th.getAttribute('value')).toBe(id)
  })

  test('no configs', () => {
    const Component = () => <Options />
    renderComponent(<Component />)
    const th = document.getElementsByTagName('input')[0]
    expect(th.getAttribute('value')).toBe(null)
  })
})

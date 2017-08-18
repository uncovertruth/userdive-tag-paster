/* @flow */
import 'jest'
import { random } from 'faker'
import { inject } from '../app/js/injector'

declare var describe: Function
declare var test: Function
declare var expect: Function

describe('injector', () => {
  const elementId = random.uuid()

  test('vaild id', () => {
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15)
    }
    inject(elementId, random.uuid(), config)
    expect(document.getElementById(elementId))
  })
})

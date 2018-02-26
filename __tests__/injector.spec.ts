import { random } from 'faker'
import { inject } from '../app/injector'

describe('injector', () => {
  const elementId = random.uuid()

  test('vaild id', () => {
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15),
      ignore: random.alphaNumeric(15)
    }
    inject(elementId, `a${random.uuid()}`, config) // The attribute key must start with an alphabet.
    expect(document.getElementById(elementId))
  })

  test('ignore domain', () => {
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15),
      ignore: 'about:blank'
    }
    inject(elementId, `a${random.uuid()}`, config) // L13
    expect(document.getElementById(elementId))
  })
})

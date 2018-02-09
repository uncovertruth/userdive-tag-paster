import { random } from 'faker'
import localStorage from 'mock-local-storage'
import chrome from 'sinon-chrome'

declare var require: any
declare var global: any

describe('background', () => {
  let bg
  beforeEach(() => {
    global.localStorage = localStorage
    global.chrome = chrome

    const BG = require('../app/actions/background').default
    bg = new BG()
  })

  test('defined', () => {
    expect(bg).toBeDefined()
  })

  test('get / set', () => {
    const key = random.alphaNumeric()
    const value = random.alphaNumeric()

    expect(bg.get(key)).toBe('')

    expect(bg.set(key, value)).toBe(undefined)
    expect(bg.get(key)).toBe(value)
  })

  test('toggle', () => {
    expect(bg.toggle()).toBe('active')
    expect(bg.toggle()).toBe('')
  })

  test('badge', () => {
    expect(bg.updateBadge(random.word()))
    expect(bg.updateBadge(random.number()))
  })
})

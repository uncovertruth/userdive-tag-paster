/* @flow */
/** @jsx h */
import { h } from 'preact'
import render from 'preact-render-to-string'

import Popup from '../app/components/popup'

describe('popup', () => {
  test('vaild id', () => {
    const tree = render(
      <Popup
        isActive
        data={{
          a: 'a',
          b: 1
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})

/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Options from '../components/options'
import { get } from '../actions/options'

  ;(async () => {
  render(<Options configs={await get()} />, document.body)
})()

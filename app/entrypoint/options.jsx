/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Options from '../components/options'
import { get } from '../actions/options'
  ;(async () => {
  const data = await get()
  render(<Options {...data} />, document.body)
})()

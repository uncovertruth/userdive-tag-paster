/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Popup from '../components/popup'
import { get } from '../actions/popup'

window.addEventListener('load', e => {
  ;(async () => {
    const data = await get()
    render(<Popup {...data} />, document.getElementById('info'))
  })()
})

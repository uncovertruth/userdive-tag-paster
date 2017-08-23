/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Popup from '../components/popup'
import { get } from '../actions/popup'

window.addEventListener('load', e => {
  ;(async () => {
    render(<Popup data={(await get()).data} />, document.getElementById('info'))
  })()
})

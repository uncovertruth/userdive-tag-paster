/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Popup from '../components/popup'
import { get, isActive } from '../actions/popup'

window.addEventListener('load', async e => {
  if (await isActive()) {
    const userData = await get()
    render(<Popup {...userData} />, document.getElementById('info'))
    return
  }
  const message = {
    data: {
      status: 'OFF',
      message: 'to enable paster, please click buton in popup window'
    }
  }
  render(<Popup {...message} />, document.getElementById('info'))
})

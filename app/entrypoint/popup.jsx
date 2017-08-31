/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Popup from '../components/popup'
import { get } from '../actions/popup'
import { get as getOptions } from '../actions/options'

async function load () {
  const { isActive } = await getOptions()

  let data = {
    status: 'OFF',
    message: 'to enable paster, please click buton in popup window'
  }
  if (isActive) {
    data = await get()
  }
  render(<Popup isActive data={data} />, document.getElementById('info'))
}

load()

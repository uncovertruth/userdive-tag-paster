/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Popup from '../components/popup'
import { get } from '../actions/popup'
import { get as getOptions } from '../actions/options'

window.addEventListener('load', e => {
  ;(async function () {
    const { isActive } = await getOptions()
    let data = {
      status: 'OFF',
      message: 'to enable paster, please click buton in popup window'
    }
    if (isActive) {
      data = await get()
    }
    render(
      <Popup isActive={isActive} data={data} />,
      document.getElementById('info')
    )
  })()
})

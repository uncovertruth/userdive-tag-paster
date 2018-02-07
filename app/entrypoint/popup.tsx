import { h, render } from 'preact'
import { get as getOptions } from '../actions/options'
import { get } from '../actions/popup'
import Popup from '../components/popup'

window.addEventListener('load', e => {
  (async function () {
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

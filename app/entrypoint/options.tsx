import { h, render } from 'preact'
import Options from '../components/options'
import { get } from '../actions/options'
  ;(async () =>
  render(<Options {...await get()} />, document.getElementById('app')))()

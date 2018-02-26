import { h, render } from 'preact'
import { get } from '../actions/options'
import Options from '../components/options'

;(async () =>
  render(<Options {...await get()} />, document.getElementById('app')))()

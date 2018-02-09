import { h, render } from 'preact'
import { get } from '../actions/options'
import Options from '../components/options'

declare var React: any
;(async () =>
  render(<Options {...await get()} />, document.getElementById('app')))()

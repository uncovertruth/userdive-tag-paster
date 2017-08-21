/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Popup from '../components/popup'
import { get } from '../actions/popup'

render(<Popup data={get()} />, document.getElementById('info'))

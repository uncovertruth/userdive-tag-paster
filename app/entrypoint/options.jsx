/* @flow */
/** @jsx h */
import { h, render } from 'preact'
import Options from '../components/options'
import { get } from '../actions/options'

render('app', <Options {...get()} />)

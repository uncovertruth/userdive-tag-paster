/* @flow */
import thenChrome from 'then-chrome'
import { CO_GET_STATE, BG_TOGGLE } from '../constants'

export async function get () {
  const tabs = await thenChrome.tabs.query({
    active: true,
    currentWindow: true
  })

  const data = await thenChrome.tabs.sendMessage(tabs[0].id, {
    content: CO_GET_STATE
  })
  return data
}

export async function toggle () {
  await thenChrome.runtime.sendMessage({
    bg: BG_TOGGLE
  })
  window.close()
}

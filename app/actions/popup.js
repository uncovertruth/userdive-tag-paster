/* @flow */
import thenChrome from 'then-chrome'

export async function get () {
  const tabs = await thenChrome.tabs.query({
    active: true,
    currentWindow: true
  })

  const data = await thenChrome.tabs.sendMessage(tabs[0].id, {
    content: 'fetchCookie'
  })
  return data
}

export async function toggle () {
  await thenChrome.runtime.sendMessage({
    bg: 'toggleExtension'
  })

  const tabs = await thenChrome.tabs.query({
    active: true,
    currentWindow: true
  })

  thenChrome.tabs.sendMessage(tabs[0].id, { content: 'reloadPage' })

  window.close()
}

export async function isActive () {
  const { bg } = await thenChrome.runtime.getBackgroundPage()
  return bg.get('IS_ACTIVE')
}

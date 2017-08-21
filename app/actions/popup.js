/* @flow */
import thenChrome from 'then-chrome'

export async function get () {
  const tabs = await thenChrome.runtime.query({
    active: true,
    currentWindow: true
  })

  const data = await thenChrome.tabs.sendMessage(tabs[0].id, {
    content: 'fetchCookie'
  })

  return data
}

export async function toggle () {
  await thenChrome.runtime.sendMessage({ bg: 'toggleExtension' })
  const tabs = await thenChrome.runtime.query({
    active: true,
    currentWindow: true
  })
  await thenChrome.tabs.sendMessage(tabs[0].id, { content: 'reloadPage' })
  window.close()
}

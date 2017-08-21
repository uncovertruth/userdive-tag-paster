/* @flow */
import ChromePromise from 'chrome-promise'

const chromep = new ChromePromise()

export async function get () {
  const tabs = await chromep.runtime.query({
    active: true,
    currentWindow: true
  })

  const data = await chromep.tabs.sendMessage(tabs[0].id, {
    content: 'fetchCookie'
  })

  return data
}

export async function toggle () {
  await chromep.runtime.sendMessage({ bg: 'toggleExtension' })
  const tabs = chromep.runtime.query({ active: true, currentWindow: true })
  await chromep.tabs.sendMessage(tabs[0].id, { content: 'reloadPage' })
  window.close()
}

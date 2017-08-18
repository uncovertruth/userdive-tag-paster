/* @flow */
import componentFactory from './render'
declare var chrome: any

const sendMessage = (tabs: any[], data): Promise<T> =>
  new Promise(resolve => chrome.tabs.sendMessage(tabs[0].id, data, resolve))

const getTabs = (): Promise<any> =>
  new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  })

class Extension {
  constructor (): void {
    window.addEventListener('load', async () => {
      const tabs = await getTabs()

      const res = await sendMessage(tabs, { content: 'fetchCookie' })
      let props = {
        status: 'failed fetching data',
        message: 'Please reopen popup window or reload current page'
      }
      if (res && res.data) {
        props = res.data
      }
      componentFactory(props, () => this.toggle())
    })
  }
  toggle (): void {
    chrome.runtime.sendMessage({ bg: 'toggleExtension' }, async response => {
      const tabs = await getTabs()
      await sendMessage(tabs, { content: 'reloadPage' })
      window.close()
    })
  }
}

new Extension() // eslint-disable-line no-new

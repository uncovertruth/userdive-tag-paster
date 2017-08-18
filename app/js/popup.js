/* @flow */
import componentFactory from './render'
declare var chrome: any

const sendMessage = (tabs: any[], data): Promise<T> =>
  new Promise(resolve => chrome.tabs.sendMessage(tabs[0].id, data, resolve))

const getTabs = (): Promise<any> =>
  new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  })

class StateView {
  constructor (): void {
    window.addEventListener('load', async () => {
      this.render()
    })
  }
  async render (): void {
    const tabs = await getTabs()
    const res = await sendMessage(tabs, { content: 'fetchCookie' })

    if (res && res.data) {
      componentFactory(res.data, () => {
        this.toggleExtension()
      })
      return
    }
    componentFactory(
      {
        status: 'failed fetching data',
        message: 'Please reopen popup window or reload current page'
      },
      () => {
        this.toggleExtension()
      }
    )
  }
  toggleExtension (): void {
    chrome.runtime.sendMessage({ bg: 'toggleExtension' }, async response => {
      const tabs = await getTabs()
      await sendMessage(tabs, { content: 'reloadPage' })
      window.close()
    })
  }
}
new StateView() // eslint-disable-line no-new

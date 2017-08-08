/* @flow */
import componentFactory from './render'
declare var chrome: any

class StateView {
  constructor (): void {
    window.addEventListener('load', evt => {
      this.render()
    })
  }
  render (): void {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { content: 'fetchCookie' }, response => {
        if (!response || !response.data) {
          throw new Error("couldn't recieve page data")
        }
        this.show(response.data)
      }
      )
    })
  }
  show (userData: object): void {
    componentFactory(userData, () => {
      this.toggleExtension()
    })
  }
  toggleExtension (): void {
    chrome.runtime.sendMessage({ bg: 'toggleExtension' }, response => {
      const isActive = !!response.isActive
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { content: isActive }, response => {
          this.show(response.data)
        }
        )
      })
    })
  }
}
new StateView() // eslint-disable-line no-new

/* @flow */
import componentFactory from './render'
declare var chrome: any

class StateView {
  constructor (): void {
    window.addEventListener('load', evt => {
      setTimeout(() => {
        this.render()
      }, 100)
    })
  }
  render (): void {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { content: 'fetchCookie' },
        response => {
          if (!response || !response.data) {
            this.show({
              status: 'failed fetching data',
              message: 'Please reopen popup window or reload current page'
            })
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
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { content: 'reloadPage' },
          response => {
            window.close()
          }
        )
      })
    })
  }
}
new StateView() // eslint-disable-line no-new

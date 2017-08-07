/* @flow */
declare var chrome: any

class Options {
  constructor (): void {
    this.start()
  }
  start (): void {
    this.assignEventHandlers()
    this.restoreConfigurations()
  }
  assignEventHandlers (): void {
    this.selector('#save').addEventListener('click', evt => {
      this.save(evt)
    })
  }
  restoreConfigurations (): void {
    chrome.runtime.getBackgroundPage(backgroundPage => {
      this.selector('#analytics-id').value = backgroundPage.bg.get(
        'USERDIVEId'
      )
      this.selector('#env').value = backgroundPage.bg.get('USERDIVEEnv')
      this.selector('#host').value = backgroundPage.bg.get('USERDIVEHost')
      this.selector('#ignore').value = backgroundPage.bg.get('USERDIVEIgnore')
    })
  }
  selector (selector: string): any {
    return document.querySelector(selector)
  }
  save (evt): void {
    chrome.runtime.getBackgroundPage(backgroundPage => {
      backgroundPage.bg.set('USERDIVEEnv', this.selector('#env').value)
      backgroundPage.bg.set('USERDIVEHost', this.selector('#host').value)
      backgroundPage.bg.set(
        'USERDIVEId',
        this.selector('#analytics-id').value
      )
      backgroundPage.bg.set('USERDIVEIgnore', this.selector('#ignore').value)
    })
    chrome.tabs.getCurrent(tab => {
      chrome.tabs.remove(tab.id)
    })
  }
}

new Options() // eslint-disable-line no-new

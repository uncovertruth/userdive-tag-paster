/* @flow */

declare var chrome: any

export const sendMessage = (tabs: any[], data: Object): Promise<any> =>
  new Promise(resolve => chrome.tabs.sendMessage(tabs[0].id, data, resolve))

export const query = (data: Object) =>
  new Promise(resolve => {
    chrome.tabs.query(data, resolve)
  })

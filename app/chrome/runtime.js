/* @flow */
declare var chrome: any

export function sendMessage (data: Object): Promise<any> {
  return new Promise(resolve => chrome.runtime.sendMessage(data, resolve))
}

export function onMessage (): Promise<any> {
  return new Promise(resolve =>
    chrome.runtime.onMessage.addEventListener((request, sender, sendResponse) =>
      resolve({
        request,
        sender,
        sendResponse
      })
    )
  )
}

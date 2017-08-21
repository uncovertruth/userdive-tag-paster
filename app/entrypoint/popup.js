/* @flow */
import { render } from '../components/popup'
import { query, sendMessage } from '../chrome/tabs'
import { sendMessage as runtimeSendMessage } from '../chrome/runtime'

const getTabs = (): Promise<any> => query({ active: true, currentWindow: true })

class Extension {
  constructor (): void {
    window.addEventListener('load', async () => {
      const tabs = await getTabs()

      const res = await sendMessage(tabs, { content: 'fetchCookie' })
      if (res && res.data) {
        render(res.data, document.getElementById('info'))
      }
    })
  }
  async toggle () {
    await runtimeSendMessage({ bg: 'toggleExtension' })
    const tabs = await getTabs()
    await sendMessage(tabs, { content: 'reloadPage' })
    window.close()
  }
}

new Extension() // eslint-disable-line no-new

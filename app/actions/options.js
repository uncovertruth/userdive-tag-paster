/* @flow */
import { getBackgroundPage } from '../chrome/runtime'

declare var chrome: any

export async function get () {
  const { bg } = await getBackgroundPage()
  bg.get('USERDIVEId')
  bg.get('USERDIVEEnv')
  bg.get('USERDIVEHost')
  bg.get('USERDIVEIgnore')
}

export async function set ({ env, host, id, ignores, isActive }: any) {
  const { bg } = await getBackgroundPage()
  bg.set('USERDIVEEnv', env)
  bg.set('USERDIVEHost', host)
  bg.set('USERDIVEId', id)
  bg.set('USERDIVEIgnore', ignores)

  chrome.tabs.getCurrent(tab => {
    chrome.tabs.remove(tab.id)
  })
}

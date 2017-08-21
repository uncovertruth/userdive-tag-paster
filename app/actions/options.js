/* @flow */
import ChromePromise from 'chrome-promise'

const chromep = new ChromePromise()

export async function get () {
  const { bg } = await chromep.runtime.getBackgroundPage()
  bg.get('USERDIVEId')
  bg.get('USERDIVEEnv')
  bg.get('USERDIVEHost')
  bg.get('USERDIVEIgnore')
}

export async function set ({ env, host, id, ignores, isActive }: any) {
  const { bg } = await chromep.runtime.getBackgroundPage()
  bg.set('USERDIVEEnv', env)
  bg.set('USERDIVEHost', host)
  bg.set('USERDIVEId', id)
  bg.set('USERDIVEIgnore', ignores)

  chromep.tabs.getCurrent(tab => {
    chromep.tabs.remove(tab.id)
  })
}

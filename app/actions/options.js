/* @flow */
import thenChrome from 'then-chrome'

export async function get () {
  const { bg } = await thenChrome.runtime.getBackgroundPage()
  bg.get('USERDIVEId')
  bg.get('USERDIVEEnv')
  bg.get('USERDIVEHost')
  bg.get('USERDIVEIgnore')
}

export async function set ({ env, host, id, ignores, isActive }: any) {
  const { bg } = await thenChrome.runtime.getBackgroundPage()
  bg.set('USERDIVEEnv', env)
  bg.set('USERDIVEHost', host)
  bg.set('USERDIVEId', id)
  bg.set('USERDIVEIgnore', ignores)

  const tab = await thenChrome.tabs.getCurrent()
  thenChrome.tabs.remove(tab.id)
}

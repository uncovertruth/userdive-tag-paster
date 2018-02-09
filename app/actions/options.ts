import {
  IS_ACTIVE,
  USERDIVE_ENV,
  USERDIVE_HOST,
  USERDIVE_ID,
  USERDIVE_IGNORE
} from '../constants'

import thenChrome from 'then-chrome'

export async function get () {
  const { bg } = await thenChrome.runtime.getBackgroundPage()
  return {
    id: bg.get(USERDIVE_ID),
    env: bg.get(USERDIVE_ENV),
    host: bg.get(USERDIVE_HOST),
    ignore: bg.get(USERDIVE_IGNORE),
    isActive: !!bg.get(IS_ACTIVE)
  }
}

export async function set ({ env, host, id, ignore, isActive }: any) {
  const { bg } = await thenChrome.runtime.getBackgroundPage()
  bg.set(USERDIVE_ENV, env)
  bg.set(USERDIVE_HOST, host)
  bg.set(USERDIVE_ID, id)
  bg.set(USERDIVE_IGNORE, ignore)

  const tab = await thenChrome.tabs.getCurrent()
  thenChrome.tabs.remove(tab.id)
}

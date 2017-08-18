/* @flow */
function injectScript (id: string, source: string): void {
  const th = document.getElementsByTagName('body')[0]
  const s = document.createElement('script')
  s.text = source
  s.id = id
  th.appendChild(s)
}

type Config = {
  id: string,
  host: string,
  env: string,
  ignore: string
}

function createTag (
  elementId: string,
  attrName: string,
  { id, host, env }: Config
): string {
  if (id.length < 3 || host.length < 14) {
    return ''
  }
  return ``
}

export function inject (id: string, attr: string, config: Config) {
  injectScript(id, createTag(id, attr, config))
}

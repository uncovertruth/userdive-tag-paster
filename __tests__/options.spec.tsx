import { h } from 'preact'
import { render } from 'preact-render-to-string'

import Options from '../app/components/options'

describe('options', () => {
  const data = {
    id: 'id',
    env: 'env',
    host: 'host',
    ignore: 'ignore'
  }

  test('vaild configs', () => {
    const tree = render(<Options {...data} />)
    expect(tree).toMatchSnapshot()
  })
})

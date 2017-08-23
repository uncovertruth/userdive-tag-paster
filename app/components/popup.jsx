/* @flow */
/** @jsx h */
import { toggle, isActive } from '../actions/popup'
import { h, Component } from 'preact'

type Props = {
  id: string
}

export default class Popup extends Component<Props> {
  constructor (props: Object) {
    super(props)
    this.state = props
    ;(async () => {
      this.setState({ isActive: await isActive() })
    })()
  }

  toggle () {
    const isActive = toggle()
    this.setState({ isActive })
  }

  render () {
    return (
      <div>
        <table>
          {Object.keys(this.state.data).map((d, key) =>
            <tr>
              <th>
                {d}
              </th>
              <th>
                {this.state.data[d]}
              </th>
            </tr>
          )}
        </table>
        <button onClick={this.toggle}>
          Turn {this.state.isActive ? 'OFF' : 'ON'}
        </button>
      </div>
    )
  }
}

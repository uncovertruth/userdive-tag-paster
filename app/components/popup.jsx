/* @flow */
/** @jsx h */
import { toggle } from '../actions/popup'
import { h, Component } from 'preact'

type Props = {
  id: string
}

type userData = {
  id: string,
  env: string,
  host: string,
  ignores: string
}

export default class Popup extends Component<Props> {
  constructor (props: userData) {
    super(props)
    this.state = props
  }

  toggle () {
    const isActive = toggle()
    this.isActive = isActive
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
        <button onClick={this.toggle}>Toggle</button>
      </div>
    )
  }
}

/* @flow */
/** @jsx h */
import { toggle } from '../actions/popup'
import { h, Component } from 'preact'

type Props = {
  isActive: boolean,
  data: {
    [string]: string
  }
}

export default class Popup extends Component<Props> {
  render () {
    const { isActive, data } = this.props
    return (
      <div>
        <table>
          {Object.keys(data).map((d, key) =>
            <tr key={key}>
              <th>
                {d}
              </th>
              <th>
                {data[d]}
              </th>
            </tr>
          )}
        </table>
        <button onClick={toggle}>
          Turn {isActive ? 'OFF' : 'ON'}
        </button>
      </div>
    )
  }
}

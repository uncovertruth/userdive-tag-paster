/* @flow */
/** @jsx h */
import { h, Component } from 'preact'

type Props = {
  id: string
}

export default class Popup extends Component<Props> {
  render () {
    return (
      <div>
        {Object.keys(this.props).map((d, key) =>
          <p>
            {this.props[d]}
          </p>
        )}
      </div>
    )
  }
}

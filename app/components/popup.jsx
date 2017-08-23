/* @flow */
/** @jsx h */
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
  render () {
    return (
      <div>
        {Object.keys(this.state.data).map((d, key) =>
          <p>
            {this.state.data[d]}
          </p>
        )}
      </div>
    )
  }
}

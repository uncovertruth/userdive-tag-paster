/* @flow */
/** @jsx h */
import { h, Component, render as preactRender } from 'preact'

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

export function render (props: Props, id: any) {
  preactRender(<Popup {...props} />, id)
}

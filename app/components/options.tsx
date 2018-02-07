import { Component, h } from 'preact'
import { set } from '../actions/options'

declare var React: any

type Store = {
  id: string
  env: string
  host: string
  ignore: string
  isActive: string
}

export default class Options extends Component<Store, Store> {
  constructor (props: Store) {
    super(props)
    this.state = props
    this.onChangeId = this.onChangeId.bind(this)
    this.onChangeEnv = this.onChangeEnv.bind(this)
    this.onChangeHost = this.onChangeHost.bind(this)
    this.onChangeIgnore = this.onChangeIgnore.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  onChangeId ({ target }: any) {
    this.setState({ id: target.value })
  }
  onChangeEnv ({ target }: any) {
    this.setState({ env: target.value })
  }
  onChangeHost ({ target }: any) {
    this.setState({ host: target.value })
  }
  onChangeIgnore ({ target }: any) {
    this.setState({ ignore: target.value })
  }
  onSave () {
    set(this.state)
  }
  render () {
    const { id, env, host, ignore, isActive } = this.state
    return (
      <div>
        <div>
          <span>{`state: ${isActive || 'OFF'}`}</span>
        </div>
        <div>
          <span>Id</span>
          <input type='text' value={id} onChange={this.onChangeId} />
        </div>
        <div>
          <span>Env</span>
          <input type='text' value={env} onChange={this.onChangeEnv} />
        </div>
        <div>
          <span>Source</span>
          <input type='text' value={host} onChange={this.onChangeHost} />
        </div>
        <div>
          <span>
            Ignored domains (plz split<b>line break)</b>
            <br />
          </span>
          <textarea
            rows='4'
            cols='40'
            value={ignore}
            onChange={this.onChangeIgnore}
          />
        </div>
        <button id='toggle' onClick={this.onSave}>
          Save
        </button>
      </div>
    )
  }
}

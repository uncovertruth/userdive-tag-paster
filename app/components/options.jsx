/* @flow */
/** @jsx h */
import { h, Component } from 'preact'
import { set } from '../actions/options'

type Store = {
  id: string,
  env: string,
  host: string,
  ignores: string
}

export default class Options extends Component<Store, Store> {
  onChangeId: Function
  onChangeEnv: Function
  onChangeHost: Function
  onSave: Function
  constructor (props: Store) {
    super(props)
    this.state = props
    this.onChangeId = this.onChangeId.bind(this)
    this.onChangeEnv = this.onChangeEnv.bind(this)
    this.onChangeHost = this.onChangeHost.bind(this)
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
  onChangeIgnores ({ target }: any) {
    this.setState({ ignores: target.value })
  }
  onSave () {
    set(this.state)
  }
  render () {
    const { id, env, host, ignores } = this.state.configs
    return (
      <div>
        <div>
          <span>state</span>
          <span id='active' />
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
            value={ignores}
            onChange={this.onChangeIgnores}
          />
        </div>
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

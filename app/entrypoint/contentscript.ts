import Provider from '../actions/contentscript'
declare var window: any
window.content = new Provider()

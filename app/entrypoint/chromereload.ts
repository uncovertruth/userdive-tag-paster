// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

const LIVERELOAD_HOST = 'localhost:'
const LIVERELOAD_PORT = 35729
const connection = new WebSocket(
  'ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload'
)

connection.onerror = (error) => {
  // tslint:disable-next-line:no-console
  console.log('reload connection got error:', error) // eslint-disable-line no-console
}

connection.onmessage = (e) => {
  if (e.data) {
    const data = JSON.parse(e.data)
    if (data && data.command === 'reload') {
      chrome.runtime.reload()
    }
  }
}

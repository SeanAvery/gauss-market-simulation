export default class Socket {
  init = (params) => this.url = `ws://${params.host}:${params.port}`

  start = () => {
    this.ws = new WebSocket(this.url, 'a')

    this.ws.onopen = () => console.log('### connected!')

    this.ws.onmessage = (msg) => console.log('### received message', msg)

    this.ws.onerror = (err) => console.log('### error in websocket', err)

    this.ws.onclose = () => console.log('### websocket closed')
  }

  sendMsg = (data) => {
    this.ws.send(JSON.stringify(data))
  }
}

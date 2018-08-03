import WS from 'ws'

export default class Socket {
  init = (params) => {
    this.url = `ws://${params.host}:${params.port}`
    console.log('this.url', this.url)
  }

  start = () => {
    this.ws = new WS(this.url)

    this.ws.on('open', () => console.log('### ws server started'))
    this.ws.on('message', async (msg) => await this.handleMsg(msg))
  }

  handleMsg = (msg) => console.log('### received message', msg)
}


const socket = new Socket()
socket.init({host: 'localhost', port: 3344})
socket.start()
// .then(() => console.log('### socket died'))
// .catch((err) => console.log('socket error', err))

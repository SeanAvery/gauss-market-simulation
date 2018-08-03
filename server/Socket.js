import { Server } from 'ws'

export default class Socket {
  clients = []

  init = (params) => this.params = params

  start = () => {
    const ws = new Server({ host: 'localhost', port: this.params.port, server: true })

    ws.on('connection', (client) => {
      console.log('### connected to client')
      client.send('hey')

      client.on('message', (data) => console.log(data))

      client.on('close', () => console.log('### connection closed '))
    })
    console.log('### ws server listening on port', this.params.port)
  }
}


const socket = new Socket()
socket.init({host: 'localhost', port: 3344})
socket.start()
// .then(() => console.log('### socket died'))
// .catch((err) => console.log('socket error', err))

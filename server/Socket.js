import net from 'net'


export default class Socket {
  init = (params) => this.port = params.port

  start = () => {
    const server = net.createServer(c => {
      console.log('### connected to client')

      c.on('data', (msg) => console.log('### received data', msg))
    })

    server.listen(this.port, () => console.log('### server listening'))
  }
}

const socket = new Socket()
socket.init({ port: 3344 })
socket.start()

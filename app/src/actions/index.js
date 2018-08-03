import Socket from './Socket'

const socket = new Socket()
socket.init({host: 'localhost', port: 3344})

export {
  socket
}

import { Server } from 'ws'
import Simulation from './Simulation'
import ipc from 'node-ipc'

export default class Socket {
  clients = []

  init = (params) => this.params = params

  startIpc = () => {
    ipc.config.id =  'socket'
    ipc.config.retry = 1000

    ipc.connectToNet('simulation', () => {
      ipc.of.simulation.on('connect', () => ipc.log('### connected to simulation'))

      ipc.of.simulation.on('message', (data) => ipc.log('### received data', data))

      ipc.of.simulation.on('disconnect', () => ipc.log('### disconnected from simulation'))
    })
  }


  startWs = () => {
    const ws = new Server({ host: 'localhost', port: this.params.port, server: true })

    ws.on('connection', (client) => {
      console.log('### connected to client')

      client.on('message', (data) => this.handleMsg(data))

      client.on('close', () => console.log('### connection closed '))
    })
    console.log('### ws server listening on port', this.params.port)
  }

  handleMsg = (msg) => {
    switch (msg.type) {
      case 'start':
        this.startSimulation()
        break
      default:
        this.startSimulation()
        break
    }
  }

  startSimulation = () => {
    const simulation = new Simulation()
    simulation.init({price: 10, volatility: 2 })
    simulation.startIpc()
    simulation.simulate()
    .then(() => console.log('### finished simulation'))
    .catch(err => console.log('### error in simulation', err))
  }
}


const socket = new Socket()
socket.init({host: 'localhost', port: 3344})
socket.startIpc()
socket.startWs()
// .then(() => console.log('### socket died'))
// .catch((err) => console.log('socket error', err))

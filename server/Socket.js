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
      ipc.of.simulation.on('connect', () => {
        console.log('### connected to simulation server')
        ipc.of.simulation.emit('message', '')
      })

      ipc.of.simulation.on('message', (data) => {
        this.client.send(data)
      })

      ipc.of.simulation.on('disconnect', () => ipc.log('### disconnected from simulation'))
    })
  }


  startWs = () => {
    this.ws = new Server({ host: 'localhost', port: this.params.port, server: true })

    this.ws.on('connection', (client) => {
      console.log('### connected to client')
      this.client = client

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

  startSimulationServer = () => {
    this.simulation = new Simulation()
    this.simulation.init({price: 10, volatility: 2 })
    this.simulation.startIpc()
  }

  startSimulation = () => {
    this.simulation.simulate()
    .then(() => console.log('### finished simulation'))
    .catch(err => console.log('### error in simulation', err))
  }
}


const socket = new Socket()

socket.init({host: 'localhost', port: 3344})
socket.startSimulationServer()
socket.startIpc()
socket.startWs()
// .then(() => console.log('### socket died'))
// .catch((err) => console.log('socket error', err))

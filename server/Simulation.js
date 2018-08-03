import gaussian from 'gaussian'
import delay from 'async-delay'
import ipc from 'node-ipc'

export default class Simulation {
  init = (params) => {
    this.price = params.price
    this.volatility = params.volatility
  }

  startIpc = () => {
    console.log('made it here')
    ipc.config.id = 'simulation'
    ipc.config.retry = 1000
    ipc.config.maxConnections = 1

    ipc.serveNet(() => {
      ipc.server.on('message', (data, socket) => ipc.log('### received message', data))
      ipc.server.on('socket.disconnected', (data, socket) => console.log('### disconnected'))
    })

    this.ipc = ipc
    this.ipc.server.start()
  }

  simulate = async () => {
    while (true) {
      this.price = await this.bellRandom(this.price, this.volatility)
      this.ipc.server.emit({ price: this.price })
      await delay(1000)
    }
  }

  bellRandom = (mean, variance) => {
    const distribution = gaussian(mean, variance)
    return distribution.ppf(Math.random())
  }
}

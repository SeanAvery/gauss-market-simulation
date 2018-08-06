import gaussian from 'gaussian'
import delay from 'async-delay'
import ipc from 'node-ipc'

export default class Simulation {
  init = (params) => {
    this.price = params.price
    this.volatility = params.volatility
  }

  startIpc = () => {
    ipc.config.id = 'simulation'
    ipc.config.retry = 1000
    ipc.config.maxConnections = 1

    ipc.serveNet(() => {
      ipc.server.on('message', (data, client) => {
        this.client = client
      })
      ipc.server.on('socket.disconnected', (data, socket) => console.log('### disconnected'))
    })

    this.ipc = ipc
    this.ipc.server.start()
  }

  simulate = async () => {
    while (true) {
      const price = await this.bellRandom(this.price, this.volatility)
      if (price < 0) price = 0
      this.price = price
      this.ipc.server.emit(this.client, 'message', JSON.stringify({ price: this.price }))
      await delay(1000)
    }
  }

  bellRandom = (mean, variance) => {
    const distribution = gaussian(mean, variance)
    return distribution.ppf(Math.random())
  }
}

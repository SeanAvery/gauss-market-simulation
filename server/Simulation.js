import gaussian from 'gaussian'
import delay from 'async-delay'

export default class Simulation {
  init = (params) => {
    this.price = params.price
    this.volatility = params.volatility
  }

  simulate = async () => {
    while (true) {
      this.price = await this.bellRandom(this.price, this.volatility)
      console.log('this.price', this.price)
      await delay(1000)
    }
  }

  bellRandom = (mean, variance) => {
    const distribution = gaussian(mean, variance)
    return distribution.ppf(Math.random())
  }
}

const simulation = new Simulation()

simulation.init({price: 10, volatility: 2 })
simulation.simulate()
.then(() => console.log('### finished simulation'))
.catch(err => console.log('### error in simulation', err))

export default class Socket {
  init = (params) => this.url = `ws://${params.host}:${params.port}`

  test = () => {

  }
  start = () => {
    return (dispatch, getState) => {
      this.ws = new WebSocket(this.url, 'a')

      this.ws.onopen = () => console.log('### connected!')

      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data)
        console.log('### received msg', data.price, typeof data)
        dispatch({
          type: 'appendPriceHistory',
          data: {
            x: getState().price.priceHistory.length,
            y: data.price }})
      }

      this.ws.onerror = (err) => console.log('### error in websocket', err)

      this.ws.onclose = () => console.log('### websocket closed')
    }
  }

  sendMsg = (data) => {
    this.ws.send(JSON.stringify(data))
  }
}

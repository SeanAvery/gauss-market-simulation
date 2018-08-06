import React, { Component } from 'react'
import '../../node_modules/react-vis/dist/style.css'
import { XYPlot, LineSeries, XAxis, YAxis } from 'react-vis'
import { connect } from 'react-redux'
import { socket } from '../actions/index'

class Price extends Component {
  componentDidMount = () => this.props.dispatch(socket.start())

  render = () => {
    const data = this.props.priceHistory
    console.log('data', data)
    return (
      <div style={{ margin: 20 }}>
        <XYPlot height={400} width={700}>
          <LineSeries data={data} />
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    )
  }
}

/*

*/
const storeToProps = (store) => store.price

export default connect (storeToProps)(Price)

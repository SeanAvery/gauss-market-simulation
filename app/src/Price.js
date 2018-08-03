import React, { Component } from 'react'
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis } from 'react-vis'

export default class Price extends Component {
  data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ]

  render = () => (
    <div style={{ margin: 20 }}>
      <XYPlot height={400} width={700}>
        <LineSeries data={this.data} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  )
}

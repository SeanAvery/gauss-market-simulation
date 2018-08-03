import React, { Component } from 'react'
import SideNav from './SideNav'
import Price from './Price'
import { socket } from './actions/index'

export default class Main extends Component {
  componentDidMount = () => socket.start()

  render() {
    return (
      <div style={styles.mainWndw}>
        <div>
          <TopNav />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SideNav />
            <Price />
          </div>
        </div>
      </div>
    )
  }
}

const TopNav = () => (
  <div style={styles.topNav}>
    <h3>GAUSS</h3>
  </div>
)

const styles = {
  mainWndw: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'roboto',
    height: '100%',
    width: '100%',
  },
  topNav: {
    width: '100%',
    height: 50,
    backgroundColor: '#383838',
    color: 'white',
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center'
  },
}

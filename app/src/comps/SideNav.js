import React, { Component } from 'react'
import { Button, TextField, MenuList, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'

class SideNav extends Component {
  exp = {}

  state = {
    traders: 0,
    assets: 2,
    initVolume: 10,
    initPrice: 10,
    volitilitiy: 2,
  }

  handleFormChange = (e, type) => {
    const data = e.target.value
    switch (type) {
      case 'traders':
        this.exp.traders = data
        break
      case 'full':
        this.exp.probability = 'full'
        break
      case 'random':
        this.exp.probability = 'random'
      case 'assets':
        this.exp.assets = data
      default:
        break
    }
  }

  startSimulation = () => {
    console.log('hit server withh exp hyperparams')
  }

  render = () => (
    <div style={styles.sideNavWndw}>
      <MenuList role='menu'>
        <MenuItem onClick={(e) => this.handleFormChange(e, '')}>Full</MenuItem>
        <MenuItem onClick={(e) => this.handleFormChange(e, '')}>Random</MenuItem>
      </MenuList>
      <TextField
        id="number"
        label="traders"
        value={this.state.age}
        onChange={(e) => this.handleFormChange(e, 'traders')}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        />
      <TextField
        id="number"
        label="assets"
        value={this.state.age}
        onChange={(e) => this.handleFormChange(e, 'assets')}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        />
      <TextField
        id="number"
        label="volatility"
        value={this.state.age}
        onChange={(e) => this.handleFormChange(e, 'traders')}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        />
        <Button raised color="accent" onClick={() => this.startSimulation()} style={{ marginTop: 15, marginBottom: 75 }}>
          Simulate
        </Button>
    </div>
  )
}

const storeToProps = (store) => store.price

export default connect(storeToProps)(SideNav)

const styles = {
  sideNavWndw: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    width: 250,
  },
  textField: {
    paddingLeft: 10,
  }
}

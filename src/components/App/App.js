import React from 'react'
import Timer from '../Timer'
import Settings from '../Settings'

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Timer />
        <Settings />
      </div>
    )
  }
}

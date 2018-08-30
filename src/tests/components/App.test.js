import React from 'react'
import { shallow } from 'enzyme'
import App from '../../components/App'

describe('Presentational component: <App />', () => {
  test('Renders without crashing', () => {
    shallow(<App />)
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { initialState as timerState } from '../../store/modules/timer'
import { initialState as settingsState } from '../../store/modules/settings'
import TimerContainer from './TimerContainer'

const store = configureStore()({
  timer: timerState,
  settings: settingsState
})

describe('Connected <Timer />', () => {
  // Shallow render the container component using the mocked redux store.
  // Then use `dive` to shallow render the connected <Timer /> component.
  const container = shallow(<TimerContainer store={store} />)
  const component = container.dive()

  test('Renders root element', () => {
    expect(component.find('.Timer').length).toEqual(1)
  })
  test(`Renders an element with the id="time-left" that contains a string
  in the format HH:MM:SS`, () => {
    expect(component.find('#time-left').length).toBe(1)
    expect(component.find('#time-left').text()).toMatch(/\d{2}:\d{2}:\d{2}/)
  })

  test(`Renders element id="timer-label" that contains a string indicating
  a session is initialized`, () => {
    expect(component.find('#timer-label').length).toBe(1)
    expect(component.find('#timer-label').text()).toMatch(
      new RegExp(`${timerState.type}`, 'i')
    )
  })

  test('Renders a clickable element with the id="start_stop"', () => {
    expect(component.find('#start_stop').length).toBe(1)
  })

  test(`Renders a clickable element with a corresponding id="reset"`, () => {
    expect(component.find('#reset').length).toBe(1)
  })
})

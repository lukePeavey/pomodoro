import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { initialState as settingsState } from '../../store/modules/settings'
import { initialState as timerState } from '../../store/modules/timer'
import TimerContainer from '../../components/Timer/TimerContainer'

describe('Presentational component: <Timer />', () => {
  const mockedStore = configureMockStore()({
    settings: settingsState,
    timer: timerState
  })
  // Shallow render the TimerContainer component using the mocked redux
  // store. This renders the presentational component with default props.
  const container = shallow(<TimerContainer store={mockedStore} />)
  const wrapper = container.dive()

  it(`Renders root element with className="Timer"`, () => {
    expect(wrapper.find('.Timer').length).toEqual(1)
  })

  it(`Renders an element with the id="time-left" that contains a string
  in the format MM:SS.`, () => {
    expect(wrapper.find('#time-left').length).toBe(1)
    expect(wrapper.find('#time-left').text()).toMatch(/\d{2}:\d{2}/)
  })

  it(`Renders element id="timer-label" that contains a string indicating
  a session is initialized`, () => {
    expect(wrapper.find('#timer-label').length).toBe(1)
    expect(wrapper.find('#timer-label').text()).toBe('Session')
  })

  it('Renders a clickable element with the id="start_stop"', () => {
    expect(wrapper.find('#start_stop').length).toBe(1)
  })

  it(`Renders a clickable element with a corresponding id="reset"`, () => {
    expect(wrapper.find('#reset').length).toBe(1)
  })
})

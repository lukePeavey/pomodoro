import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { initialState } from '../../store/modules/settings'
import SettingsContainer from '../../components/Settings/SettingsContainer'

describe('Presentational component: <Settings />', () => {
  const mockedStore = configureMockStore()({ settings: initialState })
  // Shallow render the container component using the mocked redux store
  // Then use `dive` to shallow render the connected <Settings /> component.
  const container = shallow(<SettingsContainer store={mockedStore} />)
  const wrapper = container.dive()

  it('Renders the root element', () => {
    expect(wrapper.find('.Settings').length).toBe(1)
  })

  it('Renders element with id="break-label" that contains a string.', () => {
    expect(wrapper.find('#break-label').length).toBe(1)
    expect(wrapper.find('#break-label').text()).toBeTruthy()
  })

  it('Renders element with id="session-label" that contains a string.', () => {
    expect(wrapper.find('#session-label').length).toBe(1)
    expect(wrapper.find('#session-label').text()).toBeTruthy()
  })

  it(`Renders two clickable elements with IDs "break-decrement" and
  "session-decrement"`, () => {
    expect(wrapper.find('#break-decrement').length).toBe(1)
    expect(wrapper.find('#session-decrement').length).toBe(1)
  })

  it(`Renders two clickable elements with IDs "break-increment" and
  "session-increment"`, () => {
    expect(wrapper.find('#break-increment').length).toBe(1)
    expect(wrapper.find('#session-increment').length).toBe(1)
  })

  it(`Renders an element with a corresponding id="break-length", which
  by default (on load) displays a value of 5`, () => {
    expect(wrapper.find('#break-length').length).toBe(1)
    expect(parseInt(wrapper.find('#break-length').text())).toBe(5)
  })

  it(`Renders element with a corresponding id="session-length", which
  by default (on load) displays a value of 25`, () => {
    expect(wrapper.find('#session-length').length).toBe(1)
    expect(parseInt(wrapper.find('#session-length').text())).toBe(25)
  })
})

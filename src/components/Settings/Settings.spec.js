import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { initialState } from '../../store/modules/settings'
import SettingsContainer from './SettingsContainer'

const store = configureStore()({
  settings: initialState
})

describe('Connected <Settings />', () => {
  // Shallow render the container component using the mocked redux store
  // Then use `dive` to shallow render the connected <Settings /> component.
  const container = shallow(<SettingsContainer store={store} />)
  const component = container.dive()

  test('Renders the root element', () => {
    expect(component.find('.Settings').length).toBe(1)
  })

  test('Renders element with id="break-label" that contains a string.', () => {
    expect(component.find('#break-label').length).toBe(1)
    expect(component.find('#break-label').text()).toBeTruthy()
  })

  test('Renders element with id="session-label" that contains a string.', () => {
    expect(component.find('#session-label').length).toBe(1)
    expect(component.find('#session-label').text()).toBeTruthy()
  })

  test(`Renders two clickable elements with IDs "break-decrement" and
  "session-decrement"`, () => {
    expect(component.find('#break-decrement').length).toBe(1)
    expect(component.find('#session-decrement').length).toBe(1)
  })

  test(`Renders two clickable elements with IDs "break-increment" and
  "session-increment"`, () => {
    expect(component.find('#break-increment').length).toBe(1)
    expect(component.find('#session-increment').length).toBe(1)
  })

  test(`Renders an element with a corresponding id="break-length", which
  by default (on load) displays a value of 5`, () => {
    expect(component.find('#break-length').length).toBe(1)
    expect(parseInt(component.find('#break-length').text())).toEqual(
      initialState.breakLength
    )
  })

  test(`Renders element with a corresponding id="session-length", which
  by default (on load) displays a value of 25`, () => {
    expect(component.find('#session-length').length).toBe(1)
    expect(parseInt(component.find('#session-length').text())).toEqual(
      initialState.sessionLength
    )
  })
})

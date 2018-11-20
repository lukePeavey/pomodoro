import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { range } from '../utils'
import { rootReducer, actions } from '../store'
import configureStore from '../store/configure'
import App from '../components/App'

/**
 * These tests render the entire app to test the functionality
 * from a user's perspective.
 */
describe('Integration Tests', () => {
  let clock

  const store = configureStore(rootReducer)

  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const TIME_LEFT = 'div#time-left'
  const START_STOP = 'button#start_stop'
  const RESET = 'button#reset'
  const BREAK_LENGTH = 'span#break-length'
  const SESSION_LENGTH = 'span#session-length'
  const BREAK_DECREMENT = 'button#break-decrement'
  const BREAK_INCREMENT = 'button#break-increment'
  const SESSION_DECREMENT = 'button#session-decrement'
  const SESSION_INCREMENT = 'button#session-increment'
  const TIMER_LABEL = 'h1#timer-label'

  const originalTimerLabel = wrapper.find(TIMER_LABEL).text()
  const originalBreakLength = Number(wrapper.find(BREAK_LENGTH).text())
  const originalSessionLength = Number(wrapper.find(SESSION_LENGTH).text())

  const getMinutes = () => Number(wrapper.find(TIME_LEFT).text().slice(0, 2)) // prettier-ignore
  const getSeconds = () => Number(wrapper.find(TIME_LEFT).text().slice(3)) // prettier-ignore
  const getSessionLength = () => Number(wrapper.find(SESSION_LENGTH).text())
  const getBreakLength = () => Number(wrapper.find(BREAK_LENGTH).text())

  /** Setup to run before each test */
  beforeEach(() => {
    // Replace all built-in timer functions with mock versions.
    // (includes setInterval, setTimeout, requestAnimationFrame,
    // Date.now, performance.now). This allows us to simulate the
    // passing of time by calling clock.tick(advanceBy).
    // @see https://github.com/sinonjs/lolex
    clock = sinon.useFakeTimers()
    wrapper.mount()
  })

  /** Teardown to run after each test */
  afterEach(() => {
    wrapper.unmount()
    clock.uninstall()
    // Reset redux state after each test.
    store.dispatch(actions.resetAppState())
  })

  /** Final teardown, run once at the end */
  afterAll(() => {
    wrapper.unmount()
    clock.uninstall()
  })
  /**
   * Tests the settings functionality
   */
  describe('Settings', () => {
    test(`#11 Clicking #reset should restore all settings to their default
    values.`, () => {
      // Decrease break-length and session-length by 1
      wrapper.find(BREAK_DECREMENT).simulate('click')
      wrapper.find(SESSION_DECREMENT).simulate('click')

      // Check that the values of break-length / session-length decreased by 1
      expect(getBreakLength()).toEqual(originalBreakLength - 1)
      expect(getSessionLength()).toEqual(originalSessionLength - 1)

      // Click #reset button
      wrapper.find(RESET).simulate('click')

      // Break length and session length should be restored to their default values
      expect(getBreakLength()).toEqual(originalBreakLength)
      expect(getSessionLength()).toEqual(originalSessionLength)
    })

    test(`#12 When I click the element with the id "break-decrement", the value
    within id="break-length" decrements by a value of 1`, () => {
      // Confirm that break length is currently set to default value
      expect(getBreakLength()).toEqual(originalBreakLength)

      // Click #break-decrement button
      wrapper.find(BREAK_DECREMENT).simulate('click')

      // Check that break length has decreased by 1
      expect(getBreakLength()).toEqual(originalBreakLength - 1)
    })

    test(`#13 When I click the element with the id of break-increment, the value
    within id="break-length" increases by a value of 1`, () => {
      // #break-length should display the default value of 5
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(5)
      // Click the #break-decrement button
      wrapper.find(BREAK_INCREMENT).simulate('click')
      // The value displayed in #break-length should increase by 1
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(6)
    })

    test(`#14 When I click the element with the id of session-decrement,
    the value within id="session-length" decrements by a value of 1`, () => {
      // Session length should display default value of 25
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(25)
      // Click the #break-increment button
      wrapper.find(SESSION_DECREMENT).simulate('click')
      // The value displayed in #break-length should decrease by 1
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(24)
    })

    test(`#15 When I click the element with the id of session-increment,
    the value within id="session-length" increases by a value of 1`, () => {
      // Session length should display default value of 25
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(25)
      // Click the #session-increment button
      wrapper.find(SESSION_INCREMENT).simulate('click')
      // The value displayed in session length should increase by 1
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(26)
    })

    test(`#16 I should not be able to set session or break length to a value
    less than 1`, () => {
      // #break-length and session-length should display default values
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(5)
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(25)
      range(30).forEach(() => {
        wrapper.find(BREAK_DECREMENT).simulate('click')
        wrapper.find(SESSION_DECREMENT).simulate('click')
      })
      // They should display the minimum value of 1
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(1)
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(1)
    })

    test(`#17 I should not be able to set session or break length to a value
    greater than 60`, () => {
      // #break-length and session-length should display their default values
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(5)
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(25)
      // Click #break-increment and #session-increment 70 times
      range(70).forEach(() => {
        wrapper.find(SESSION_INCREMENT).simulate('click')
        wrapper.find(BREAK_INCREMENT).simulate('click')
      })
      // They should display the maximum value, which is 60
      expect(Number(wrapper.find(SESSION_LENGTH).text())).toBe(60)
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(60)
    })
  })

  /**
   * Tests the timer functionality
   */
  describe('Timer', () => {
    test(`#18 When I first click the element with id='start_stop', the timer should
    begin running from the value currently displayed in id='session-length',
    even if the value has been incremented or decremented from the original value
    of 2`, () => {
      // Decrease Session length by 1 minute
      wrapper.find(SESSION_DECREMENT).simulate('click')
      const sessionLength = Number(wrapper.find(SESSION_LENGTH).text())
      const minutesLeft = getMinutes(wrapper.find(TIME_LEFT).text())
      expect(minutesLeft).toEqual(sessionLength)
    })

    test(`#19 If the timer is running, the element with the id of time-left should
    display the remaining time in mm:ss format (decremented by a value of 1 and
    updating the display every 1000ms)`, () => {
      // The current value of #time-left should be '25:00'
      expect(wrapper.find(TIME_LEFT).text()).toBe('25:00')
      // START TIMER
      wrapper.find(START_STOP).simulate('click')
      // Move time forward by 5 seconds
      clock.tick(5000)
      // Time left should now be '24:55'
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:55')
      // Move time forward by 10 seconds.
      clock.tick(10000)
      // Time-left should now be '24:45'
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:45')
    })

    test(`#20 If the timer is running and I click the element with id='start_stop',
    the countdown should pause`, () => {
      // Confirm the initial values before starting: #time-left should be '25:00'
      expect(wrapper.find(TIME_LEFT).text()).toBe('25:00')
      // START TIMER
      wrapper.find(START_STOP).simulate('click')
      // Move time forward by 5 seconds.
      clock.tick(5000)
      // #time-left should now be '24:55'
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:55')
      // PAUSE TIMER
      wrapper.find(START_STOP).simulate('click')
      // Move time forward by another 5 seconds
      clock.tick(5000)
      // #time-left should NOT HAVE CHANGED because the timer is currently paused.
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:55')
    })

    test(`#21 If the timer is paused and I click the element with id="start_stop", the
    countdown should resume running from the point at which it was pause`, () => {
      // Confirm the initial values before starting: #time-left should be '25:00'
      expect(wrapper.find(TIME_LEFT).text()).toBe('25:00')
      // START TIMER
      wrapper.find(START_STOP).simulate('click')
      // Move time forward by 5 seconds.
      clock.tick(5000)
      // PAUSE TIMER at '24:55'
      wrapper.find(START_STOP).simulate('click')
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:55')
      // Move time forward 10 seconds.
      clock.tick(10000)
      // RE-START THE TIMER.
      wrapper.find(START_STOP).simulate('click')
      // The timer should resume from the remaining time when it was paused: '24:55'
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:55')
      // Move time forward by 5 seconds.
      clock.tick(5000)
      // The timer is running, so time-left should now be at '24:50'
      expect(wrapper.find(TIME_LEFT).text()).toBe('24:50')
    })

    test(`#22  When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a
    new countdown begins, the element with the id of timer-label should display
    a string indicating a break has begun`, () => {
      // Decrease Session length to 1 minute
      range(25).forEach(() => wrapper.find(SESSION_DECREMENT).simulate('click'))
      // Confirm the initial values before starting:
      // - Timer label should be "Session" with '01:00' remaining.
      // - Break length should be 5 minutes
      expect(wrapper.find(TIMER_LABEL).text()).toBe('Session')
      expect(wrapper.find(TIME_LEFT).text()).toBe('01:00')
      expect(Number(wrapper.find(BREAK_LENGTH).text())).toBe(5)

      // START THE TIMER
      wrapper.find(START_STOP).simulate('click')
      // Move time forward by 60 seconds
      clock.tick(60000)
      // #time-left should now be at '00:00'
      expect(wrapper.find(TIME_LEFT).text()).toBe('00:00')
      // Move time forward by another 3 seconds
      clock.tick(3000)
      // The timer should have completed. #timer-label should now display "Break",
      // indicating that next timer has started.
      expect(wrapper.find(TIMER_LABEL).text()).toBe('Break')
      // The remaining time should have reset to break-length (5 mins) when the
      // next timer started. So time-left should be roughly '04:57'. To confirm
      // this, check that remaining minutes === 4
      const minutesLeft = getMinutes(wrapper.find(TIME_LEFT).text())
      expect(minutesLeft).toBe(4)

      // #11 Clicking the button with id="reset" should stop the timer and reset it
      // to its initial value.

      // Click #reset, then move time forward by 5 more seconds
      wrapper.find(RESET).simulate('click')
      clock.tick(5000)
      // The timer should be stopped, with elements restored to their initial values.
      expect(wrapper.find(TIMER_LABEL).text()).toBe('Session')
      expect(wrapper.find(TIME_LEFT).text()).toBe('25:00')
    })
  })
})

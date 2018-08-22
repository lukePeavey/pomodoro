import reducer, { actionTypes, initialState } from './timer'

describe('Timer Reducer', () => {
  it('Should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Should handle INITIALIZE_TIMER', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.INITIALIZE_TIMER,
        payload: { type: 'BREAK' }
      })
    ).toEqual({ ...initialState, type: 'BREAK' })
  })

  test('START_TIMER for first time', () => {
    const timestamp = Date.now()
    expect(
      reducer(undefined, {
        type: actionTypes.START_TIMER,
        payload: timestamp
      })
    ).toEqual({ ...initialState, isRunning: true, startTime: timestamp })
  })

  test('Should handle START_TIMER when timer is paused', () => {
    const timestamp = Date.now()
    const prevState = {
      ...initialState,
      startTime: Date.now() - 2500,
      elapsedTime: 2500
    }
    expect(
      reducer(prevState, {
        type: actionTypes.START_TIMER,
        payload: timestamp
      })
    ).toEqual({
      ...prevState,
      isRunning: true,
      startTime: timestamp - prevState.elapsedTime
    })
  })

  test('Should handle STOP_TIMER', () => {
    const prevState = { ...initialState, isRunning: true }
    expect(reducer(prevState, { type: actionTypes.STOP_TIMER })).toEqual({
      ...initialState,
      isRunning: false
    })
  })

  test('Should handle UPDATE_ELAPSED_TIME', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.UPDATE_ELAPSED_TIME,
        payload: 4000
      })
    ).toEqual({ ...initialState, elapsedTime: 4000 })
  })
})

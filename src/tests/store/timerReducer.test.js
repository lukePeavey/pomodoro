import reducer, { actionTypes, initialState } from '../../store/modules/timer'

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
    expect(
      reducer(undefined, { type: actionTypes.START_TIMER, payload: 0 })
    ).toEqual({
      ...initialState,
      startTime: 0,
      timerState: 'RUNNING'
    })
  })

  test('Should handle PAUSE_TIMER', () => {
    const prevState = { ...initialState, timerState: 'PAUSED' }
    expect(reducer(prevState, { type: actionTypes.PAUSE_TIMER })).toEqual({
      ...initialState,
      timerState: 'PAUSED'
    })
  })

  test('Should handle RESET_TIMER', () => {
    const prevState = { ...initialState, timerState: 'RUNNING' }
    expect(reducer(prevState, { type: actionTypes.RESET_TIMER })).toEqual(
      initialState
    )
  })
})

import reducer, {
  actionTypes,
  initialState
} from '../../store/modules/settings'

describe('Settings Reducer', () => {
  it('Should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('Should handle SET_SESSION_LENGTH with valid number', () => {
    expect(
      reducer(undefined, { type: actionTypes.SET_SESSION_LENGTH, payload: 30 })
    ).toEqual({ ...initialState, sessionLength: 30 })
  })

  it('Should handle SET_BREAK_LENGTH with valid number', () => {
    expect(
      reducer(undefined, { type: actionTypes.SET_BREAK_LENGTH, payload: 30 })
    ).toEqual({ ...initialState, breakLength: 30 })
  })
})

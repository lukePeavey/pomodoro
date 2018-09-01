import { rootReducer } from '../../store'
import { initialState as settingsDefaults } from '../../store/modules/settings'
import { initialState as timerDefaults } from '../../store/modules/timer'

const initialState = {
  settings: settingsDefaults,
  timer: timerDefaults
}

describe('Root reducer', () => {
  it('Should return initialState', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState)
  })

  it(`Should handle "RESET_APP_STATE" - this should restore all modules to
  their default state.`, () => {
    const prevState = {
      timer: {
        ...initialState.timer,
        timerState: 'RUNNING'
      },
      settings: {
        ...initialState.settings,
        sessionLength: 1
      }
    }
    expect(rootReducer(prevState, { type: 'RESET_APP_STATE' })).toEqual(
      initialState
    )
  })
})

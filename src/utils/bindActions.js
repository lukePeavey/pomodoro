import * as Redux from 'redux'

/**
 * Takes an object whose values are actionCreators and returns a mapDispatchToProps
 * function that returns an `actions` props containing the bound action creators.
 *
 * @param {Redux.ActionCreatorsMapObject} actionCreators
 * @return {MapDispatchToPropParam}
 * @example
 * import { connect } from 'react-redux'
 * import { firstAction, secondAction } from 'path/to/actionCreators'
 *
 * // The connected component will receive an `actions` props with the
 * // bound action creators
 * const mapDispatchToProps = bindActions({ firstAction, secondAction })
 * connect(null, mapDispatchToProps)(MyComponent)
 *
 * class MyComponent extends React.Component {
 *   componentDidMount() {
 *     const { actions } = this.props
 *     actions.firstAction('payload')
 *   }
 * }
 *
 */
export default function bindActions(actionCreators) {
  return (dispatch) => ({
    actions: Redux.bindActionCreators(actionCreators, dispatch)
  })
}

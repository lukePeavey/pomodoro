/* eslint-disable no-unused-vars */
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { MapDispatchToPropsFunction } from 'react-redux'
/**
 * Takes an object whose values are action creators and returns a
 * mapDispatchToProps function that returns an `actions` prop containing
 * the bound action creators.
 *
 * WHY?
 * I think grouping redux actions into an `actions` prop makes the code
 * clearer and easier to read. It makes it easy to distinguish redux actions
 * from other functions that are passed down as props, such as event handlers.
 * This function just provides a clean syntax for doing this, similar to
 *
 * passing a plain object as the second argument to `connect`, except the
 * bound action creators are grouped into an `actions` props.
 *
 * @example
 * import { connect } from 'react-redux'
 * import { firstAction, secondAction } from 'path/to/actionCreators'
 *
 * const mapDispatchToProps = bindActions({
 *   firstAction,
 *   secondAction
 * })
 *
 * connect(null, mapDispatchToProps)(MyComponent)
 *
 * @example
 * // Dispatching actions from component
 * const { actions } = this.props
 * actions.firstAction(payload)
 *
 * @param {ActionCreatorsMapObject} actionCreators
 * @return {MapDispatchToPropsFunction}
 */
export default function bindActions(actionCreators) {
  return (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
}

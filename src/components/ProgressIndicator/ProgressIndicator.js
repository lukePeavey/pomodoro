import React from 'react'
import PropTypes from 'prop-types'

/**
 * A circular progress indicator to moves smoothly around the timer,
 * This can be achieved by animating the dashoffset property of an SVG
 * circle. The animated state is derived from percentComplete.
 */
export default function ProgressIndicator({ percentComplete = 0 }) {}

ProgressIndicator.propTypes = {
  /** A number representing percentage of time elapsed   */
  percentComplete: PropTypes.number.isRequired
}

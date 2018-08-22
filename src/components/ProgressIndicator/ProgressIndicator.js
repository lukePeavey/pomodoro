import React from 'react'
import PropTypes from 'prop-types'

/**
 * A circular progress indicator that moves smoothly around the timer.
 * This effect is achieved by animating the dashoffset property of an SVG
 * circle. The dashoffset value is derived from the timer state.
 */
export default function ProgressIndicator({ percentComplete = 0 }) {
  const strokeWidth = 2
  const radius = (100 - strokeWidth) / 2
  const strokeDasharray = radius * 2 * Math.PI
  const dashoffset = strokeDasharray - (strokeDasharray / 100) * percentComplete
  const props = { strokeWidth, strokeDasharray, r: radius }
  return (
    <div className="Progress">
      <svg viewBox="0 0 100 100">
        <circle className="Progress-circle base" {...props} />
        <circle
          className="Progress-circle progress"
          {...props}
          strokeDashoffset={dashoffset}
        />
      </svg>
    </div>
  )
}

ProgressIndicator.propTypes = {
  /** A number representing percentage of time elapsed   */
  percentComplete: PropTypes.number.isRequired
}

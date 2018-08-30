import React from 'react'
import PropTypes from 'prop-types'

/**
 * A circular progress indicator that moves smoothly around the timer.
 * This effect is achieved by animating the dashoffset property of an SVG
 * circle.
 */
export default function ProgressIndicator({
  percentComplete = 0,
  strokeWidth = 1
}) {
  const radius = (100 - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dashoffset = circumference - (circumference / 100) * percentComplete
  const circleProps = { strokeWidth, r: radius, strokeDasharray: circumference }
  const Circle = (props) => (
    <circle {...circleProps} {...props} className="Progress-circle" />
  )

  return (
    <div className="Progress">
      <svg viewBox="0 0 100 100">
        <Circle id="base" />
        <Circle id="progress" strokeDashoffset={dashoffset} />
      </svg>
    </div>
  )
}

ProgressIndicator.propTypes = {
  /** The per */
  percentComplete: PropTypes.number,
  strokeWidth: PropTypes.number
}

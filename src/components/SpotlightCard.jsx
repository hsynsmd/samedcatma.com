import './SpotlightCard.css'

function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(91, 108, 255, 0.22)',
  ...rest
}) {
  return (
    <div
      className={`spotlight-card ${className}`.trim()}
      style={{ '--spotlight-color': spotlightColor }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default SpotlightCard

import './AgentOrchestra.css'

/**
 * AgentOrchestra — sitenin imzası.
 * Merkezde Orchestrator, çevresinde Market Zinciri Otomasyonu projesindeki
 * uzman ajanlar. Bağlantılarda "mesaj" darbeleri akar (agent-to-agent).
 */
const CORE = { id: 'core', label: 'Orchestrator', x: 220, y: 215 }

const AGENTS = [
  { id: 'demand', label: 'LLM Agents', x: 220, y: 48 },
  { id: 'stock', label: 'NLP', x: 372, y: 132 },
  { id: 'order', label: 'Backend/API', x: 372, y: 298 },
  { id: 'report', label: 'Mobile Apps', x: 220, y: 382 },
  { id: 'rag', label: 'Vision', x: 68, y: 298 },
  { id: 'ml', label: 'ML/DL', x: 68, y: 132 },
]

function AgentOrchestra() {
  return (
    <div className="agent-orchestra" aria-hidden="true">
      <svg viewBox="0 0 440 430" role="presentation">
        {AGENTS.map((a, i) => (
          <line
            key={`edge-${a.id}`}
            className="ao-edge"
            x1={CORE.x}
            y1={CORE.y}
            x2={a.x}
            y2={a.y}
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
          />
        ))}

        {AGENTS.map((a, i) => (
          <circle key={`pulse-${a.id}`} className="ao-pulse" r="3.5">
            <animateMotion
              dur={`${2.6 + i * 0.3}s`}
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
              keyPoints="0;1;0"
              keyTimes="0;0.5;1"
              calcMode="linear"
              path={`M${CORE.x},${CORE.y} L${a.x},${a.y}`}
            />
          </circle>
        ))}

        {AGENTS.map((a, i) => (
          <g key={a.id} className="ao-node" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
            <circle className="ao-node__dot" cx={a.x} cy={a.y} r="15" />
            <circle className="ao-node__core" cx={a.x} cy={a.y} r="5" />
            <text
              className="ao-label"
              x={a.x}
              y={a.y > CORE.y ? a.y + 30 : a.y - 24}
              textAnchor="middle"
            >
              {a.label}
            </text>
          </g>
        ))}

        <g className="ao-node ao-node--core" style={{ animationDelay: '0.15s' }}>
          <circle className="ao-core__ring" cx={CORE.x} cy={CORE.y} r="30" />
          <circle className="ao-core__dot" cx={CORE.x} cy={CORE.y} r="22" />
          <text className="ao-label ao-label--core" x={CORE.x} y={CORE.y + 5} textAnchor="middle">
            HSÇ
          </text>
        </g>
      </svg>
    </div>
  )
}

export default AgentOrchestra

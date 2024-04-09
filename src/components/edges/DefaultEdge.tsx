import { red, yellow, zinc } from 'tailwindcss/colors'
import { EdgeProps, getBezierPath, useStore } from 'reactflow';

export default function DefaultEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, selected, source, target }: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });

  const { nodeInternals } = useStore((s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
  }))

  const sourceNode = nodeInternals.get(source);
  const targetNode = nodeInternals.get(target);

  const redActive = sourceNode?.selected && true
  const orangeActive = targetNode?.selected && true

  const color = redActive ? red[500] : orangeActive ? yellow[500] : zinc[300]
  
  return (
    <g>
      <path
        id={id}
        style={{
          strokeDasharray: "10 6",
          stroke: selected ? zinc[500] : color
        }}
        className='react-flow__edge-path stroke-2'
        d={edgePath}
        markerEnd={markerEnd}
      />
    </g>
  );
}

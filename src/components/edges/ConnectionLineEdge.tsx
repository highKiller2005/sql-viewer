import { ConnectionLineComponentProps, useStore } from 'reactflow';

export default ({ fromX, fromY, toX, toY  }: ConnectionLineComponentProps) => {
  // @ts-ignore: Unreachable code error
  const { connectionHandleId } = useStore();


  if (!connectionHandleId) return

  const [color] = connectionHandleId?.split('-')

  return (
    <g>
      <path
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={color}
        strokeWidth={1.5}
      />
    </g>
  );
};

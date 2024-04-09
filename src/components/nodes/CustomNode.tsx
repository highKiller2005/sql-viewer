import { ReactNode, memo } from 'react';
import { Connection, Handle, NodeProps, Position, getConnectedEdges, useNodeId, useStore } from 'reactflow';
import { orange, red, zinc } from 'tailwindcss/colors';

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

export default memo(({ data, isConnectable, selected }: NodeProps) => {
  const { nodeInternals, edges } = useStore((s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
  }))

  const nodeId = useNodeId();

  function isValidConnection({ target, source, sourceHandle, targetHandle }: Connection) {
    const targetH = targetHandle?.split('-')[3]
    const sourceH = sourceHandle?.split('-')[3]

    console.log({ targetHandle, sourceHandle })

    if (target === source) return false
    if (!nodeId || !target || !source) return false

    console.log(targetH)


    if (targetH === 'fk') {
      const node = nodeInternals.get(target);
  
      if (!node) return false
      const connectedEdges = getConnectedEdges([node], edges);

      const targetConnectedEdges = connectedEdges.filter(connectedEdge => {
        return connectedEdge.targetHandle === targetHandle
      })

      console.log(targetConnectedEdges)


      console.log(targetConnectedEdges.length)
      if (targetConnectedEdges.length >= 1) {
        return false
      }

      return sourceH === 'pk'
    }


    if (targetH === 'pk') {
      const node = nodeInternals.get(source);
      
      if (!node) return false
      const connectedEdges = getConnectedEdges([node], edges);
      

      const targetConnectedEdges = connectedEdges.filter(connectedEdge => {
        return connectedEdge.targetHandle === targetHandle
      })
      
      if (targetConnectedEdges.length >= 1) {
        return false
      }
      
      return sourceH === 'fk'
    }

    return false
  }

  return (
    <div
      style={{ borderColor: selected ? red[400] : zinc[300] }}
      className={`bg-white border-2 border-zinc-300 rounded overflow-hidden w-[220px] min-h-[50px] py-0 ${selected && 'shadow-lg shadow-red-500/90}'}`}
    >
      <div className="bg-red-400 border-none text-white font-bold text-lg text-center py-1 truncate">
        {data.name}
      </div>
      
      <div className="w-full flex flex-col text-md font-semibold">
        {data.atributes && data.atributes.map((atribute: any, index: number) => {
          let salt = ''

          for (let i = 0; i < index * 2; i++) {
            salt += ' + 21px'
          }

          return (
            <Atribute
              key={`red-${data.name}-${atribute.name}-${atribute.type}`}
              name={atribute.name}
              type={atribute.type}
            >
              {atribute.type === 'pk' && (
                <Handle
                  type="source"
                  position={Position.Left}
                  id={`red-${data.name}-${atribute.name}-${atribute.type}`}
                  style={{ ...DEFAULT_HANDLE_STYLE, top: `calc(60px ${salt})`, background: red[400] }}
                  isConnectable={isConnectable}
                  isValidConnection={isValidConnection}
                />
              )}

              {atribute.type === 'fk' && (
                <Handle
                  type="target"
                  position={Position.Right}
                  isValidConnection={isValidConnection}
      
                  id={`orange-${data.name}-${atribute.name}-${atribute.type}`}
                  style={{ ...DEFAULT_HANDLE_STYLE, top: `calc(60px ${salt})`, background: orange[400], stroke: orange[400] }}
                  isConnectable={isConnectable}
                />
              )}
            </Atribute>
          )
        })}
      </div>
    </div>
  );
});

type AtributeProps = {
  children?: ReactNode
  name: string
  type: 'pk' | 'fk' | 'normal'
}

function Atribute({ children, name, type }: AtributeProps) {
  if (type === 'pk') {
    return (
      <div className="bg-red-100 p-2 border-b-2 border-dashed border-zinc-200">
        {children}

        {name}
      </div>
    )
  }

  if (type === 'fk') {
    return (
      <div className="bg-orange-100 p-2 border-b-2 border-dashed border-zinc-200">
        {children}

        {name}
      </div>
    )
  }

  return (
    <div className="p-2 border-b-2  border-dashed border-zinc-200">
      {name}
    </div>
  )
}
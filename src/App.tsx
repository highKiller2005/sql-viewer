import {  useCallback, useRef, useState } from "react";
import ReactFlow, { Background, ConnectionMode, Controls, Node, useEdgesState, Connection, addEdge, useNodesState, ReactFlowProvider, ReactFlowInstance } from 'reactflow';

import 'reactflow/dist/style.css';

import { Square } from "./components/nodes/square";
import DefaultEdge from "./components/edges/DefaultEdge";
import CustomNode from "./components/nodes/CustomNode";
import ConnectionLineEdge from "./components/edges/ConnectionLineEdge";
import { ToolBar } from "./components/ToolBar";
import { FormContextProvider } from "./context/FormContext";

const NODE_TYPES = {
  square: Square,
  custom: CustomNode
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [
  {
    id: getId(),
    type: 'custom',
    position: {
      x: 200,
      y: 400
    },
    data: {
      name: "user",
      atributes: [
        {
          name: "id",
          type: "pk"
        },
        {
          name: "name",
          type: "normal"
        },
        {
          name: "location_id",
          type: "fk"
        },
        {
          name: "book_id",
          type: "fk"
        }
      ]
    }
  },
  {
    id: getId(),
    type: 'custom',
    position: {
      x: 800,
      y: 400
    },
    data: {
      name: "item",
      atributes: [
        {
          name: "id",
          type: "pk"
        },
        {
          name: "name",
          type: "normal"
        },
        {
          name: "location_id",
          type: "fk"
        }
      ]
    }
  },
  {
    id: getId(),
    type: 'custom',
    position: {
      x: 600,
      y: 500
    },
    data: {
      name: "location",
      atributes: [
        {
          name: "id",
          type: "pk"
        },
        {
          name: "name",
          type: "normal"
        },
        {
          name: "location",
          type: "normal"
        }
      ]
    }
  },
  {
    id: getId(),
    type: 'custom',
    position: {
      x: 700,
      y: 600
    },
    data: {
      name: "book",
      atributes: [
        {
          name: "id",
          type: "pk"
        },
        {
          name: "name",
          type: "normal"
        },
        {
          name: "autor",
          type: "normal"
        },
        {
          name: "size",
          type: "normal"
        }
      ]
    }
  }
] satisfies Node[]

export function getId() {
  return `${Math.floor(Math.random() * 1000)}`;
}

function App() {
  const reactFlowWrapper = useRef(null);

  const [edges, setEdges, onEdgesChange] = useEdgesState([])    
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)    
  const [_, setReactFlowInstance] = useState<ReactFlowInstance>();

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(prevEdges => addEdge(connection, prevEdges))
  }, [])

  return (
    <FormContextProvider>
      <div className="w-screen h-screen relative dndflow">
        <ReactFlowProvider>
          <div className="w-screen h-screen reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              connectionMode={ConnectionMode.Loose}
              nodeTypes={NODE_TYPES}
              edgeTypes={EDGE_TYPES}
              defaultEdgeOptions={{
                type: 'default'
              }}
              nodes={nodes}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
              onConnect={onConnect}
              
              connectionLineComponent={ConnectionLineEdge}
              fitView
              fitViewOptions={{
                padding: 0.2,
              }}

              onInit={setReactFlowInstance}
              onDrop={(event) => { event.preventDefault(); console.log('oi') }}
              onDragOver={(event) => { event.preventDefault(); console.log('opa') }}
            >
              <Background
                style={{ backgroundColor: '#FCFCFC' }}
              />
              <Controls />
            </ReactFlow>
          </div>

          <ToolBar setNodes={setNodes} />
        </ReactFlowProvider>
      </div>
    </FormContextProvider>
  );
}

export default App;
 
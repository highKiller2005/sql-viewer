import { getId } from "@/App";
import { Node } from "reactflow";

export function ToolBar({ setNodes }: any) {  
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    console.log("movendo")
  };
  
  function handleClick() {
    const newNode: Node = {
      id: getId(),
      type: 'custom',
      data: {
        name: "Nova entidade",
        atributes: []
      },
      position: {
        y: 500,
        x: 500
      }
    }

    setNodes((nodes: Node[]) => {
      return [...nodes, newNode]
    })
  }

  return (
    <div className="w-[90%] max-w-[250px] h-[100px] bg-gradient-to-r p-3 bg-white rounded shadow border-2 border-zinc-50 border-dashed fixed top-2 left-[50%] -translate-x-[50%] z-[99]">
      <div className="border border-red-500 font-semibold p-4 rounded cursor-pointer hover:bg-red-400 hover:text-white transition  text-center" onClick={handleClick} onDragStart={(event) => onDragStart(event, 'custom')} onDragEnd={() => console.log('ooasdasdasd')} draggable={false}>
        Adicionar Endidade
      </div>
    </div>
  )
}
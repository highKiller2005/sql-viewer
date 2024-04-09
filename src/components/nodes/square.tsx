import { NodeProps, Handle, Position } from "reactflow";

export function Square({  }: NodeProps) {
    return (
        <div className="bg-white border-4 border-blue-200 rounded w-[200px] h-[200px]">
            <Handle
                position={Position.Right}
                id="1"
                type="source"
                className="-right-5 w-6 h-6 border-2 bg-blue-500/80"
            />
            <Handle
                position={Position.Left}
                id="2"
                type="target"
            />
        </div>
    )
}
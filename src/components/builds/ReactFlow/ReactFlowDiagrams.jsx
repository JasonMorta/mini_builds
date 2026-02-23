import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import RFstyles from "./rf.module.css";
import { useCallback, useRef } from "react";
import { addEdge } from "@xyflow/react";
import ReactFlowCustomNode from "./ReactFlowCustomNode";

// build nodes
const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 100, y: 180 },
  },
];

const initialEdges = [
  {
    id: "e1",
    source: "1",
    target: "2",
    animated: true,
  },
];

//Basic Node and connection
export default function ReactFlowDiagrams() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nextEdgeIdRef = useRef(0);

  const onConnect = useCallback(
    (connection) => {
      nextEdgeIdRef.current += edges.length + 1;
      const edge = {
        ...connection,
        animated: true,
        id: `e${nextEdgeIdRef.current}`,
      };
      console.log('edge', edge)
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },

    [setEdges],
  );



  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
      
        <div>Basic Node and connection</div>
        <section className={RFstyles["react-flow-main"]}>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={(changes) => {
              console.log(changes);
              onEdgesChange(changes);
            }}
            fitView
            onConnect={onConnect}
          >
            <Background variant="dots" />
            <Controls />
            {/* <MiniMap /> */}
          </ReactFlow>
        </section>
    

      <ReactFlowCustomNode />
    </section>
  );
}

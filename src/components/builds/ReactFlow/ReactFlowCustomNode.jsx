import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo } from "react";

import TextUpdaterNode from "./TextUpdaterNode";
import TextReceiverNode from "./TextReceiverNode";
import RFstyles from "./rf.module.css";

const initialNodes = [
  {
    id: "input-1",
    type: "textUpdater",
    position: { x: 60, y: 80 },
    data: { value: "" },
  },
  {
    id: "receiver-1",
    type: "textReceiver",
    position: { x: 520, y: 80 },
    data: { value: "Text:" },
  },
];

const initialEdges = [];

export default function ReactFlowDiagrams() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Called whenever user types in an updater node
  const handleTextChange = useCallback(
    (sourceNodeId, newValue) => {
      setNodes((prevNodes) => {
        // 1) update source node's own value
        let nextNodes = prevNodes.map((node) =>
          node.id === sourceNodeId
            ? { ...node, data: { ...node.data, value: newValue } }
            : node
        );

        // 2) find all targets connected from this source node
        const targetIds = edges
          .filter((e) => e.source === sourceNodeId)
          .map((e) => e.target);

        // 3) push text into all connected target nodes
        nextNodes = nextNodes.map((node) =>
          targetIds.includes(node.id)
            ? { ...node, data: { ...node.data, value: newValue } }
            : node
        );

        return nextNodes;
      });
    },
    [edges, setNodes]
  );

  // Attach callback to updater nodes through node.data
  const nodesWithHandlers = useMemo(() => {
    return nodes.map((node) => {
      if (node.type === "textUpdater") {
        return {
          ...node,
          data: {
            ...node.data,
            onTextChange: handleTextChange,
          },
        };
      }
      return node;
    });
  }, [nodes, handleTextChange]);

  // When connecting, create edge and immediately sync current text once
  const onConnect = useCallback(
    (connection) => {
      setEdges((prev) =>
        addEdge(
          {
            ...connection,
            animated: true,
            id: `e-${connection.source}-${connection.target}-${Date.now()}`,
          },
          prev
        )
      );

      // Optional: immediately push current source text into target at connect time
      setNodes((prevNodes) => {
        const sourceNode = prevNodes.find((n) => n.id === connection.source);
        const sourceValue = sourceNode?.data?.value ?? "";

        return prevNodes.map((node) =>
          node.id === connection.target
            ? { ...node, data: { ...node.data, value: sourceValue } }
            : node
        );
      });
    },
    [setEdges, setNodes]
  );

  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNode,
      textReceiver: TextReceiverNode,
    }),
    []
  );

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <div>Text sync via edge connection</div>

      <section className={RFstyles["react-flow-main"]}>
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant="dots" />
          <Controls />
        </ReactFlow>
      </section>
    </section>
  );
}
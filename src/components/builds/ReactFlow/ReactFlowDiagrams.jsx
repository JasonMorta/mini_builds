import { useCallback, useRef } from 'react';
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import RFstyles from './rf.module.css';
import ReactFlowCustomNode from './ReactFlowCustomNode';

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 100, y: 180 } },
];

const initialEdges = [{ id: 'e1', source: '1', target: '2', animated: true }];

export default function ReactFlowDiagrams() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nextEdgeIdRef = useRef(initialEdges.length + 1);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `e${nextEdgeIdRef.current}`,
      };

      nextEdgeIdRef.current += 1;
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [setEdges],
  );

  return (
    <section className="reactflow-build">
      <div className="reactflow-build__intro build-card">
        Basic node creation and connection handling.
      </div>
      <section className={RFstyles['react-flow-main']}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
          onConnect={onConnect}
          nodeTypes={{ custom: ReactFlowCustomNode }}
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" />
        </ReactFlow>
      </section>
    </section>
  );
}

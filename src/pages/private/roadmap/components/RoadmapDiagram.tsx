import React, { useCallback, useState, useEffect } from 'react';

import { useDisclosure } from '@mantine/hooks';
import data from 'pages/private/roadmap/data/data.json';
import ReactFlow, { addEdge, Controls, MiniMap } from 'reactflow';

import CustomNode from './CustomNode';
import EdgeInfoDrewer from './EdgeInfoDrewer';
import generateNodesAndEdges from '../utils/functions';

const nodeTypes = {
  custom: CustomNode,
};

const RoadmapDiagram = (): JSX.Element => {
  const { nodes: initNodes, edges: initEdges } = generateNodesAndEdges(data);
  const [opened, { open, close }] = useDisclosure(false);

  const [nodes, setNodes] = useState(initNodes);
  const [edges, setEdges] = useState(initEdges);

  const [nodeEdge, setNodeEdge] = useState<any>(null);

  const onConnect = useCallback((params: any) => setEdges(eds => addEdge(params, eds)), []);

  const onNodeClick = useCallback((event: any, node: any) => {
    if (node.id.startsWith('step')) {
      return;
    }
    setNodeEdge(node);
    open();
  }, []);

  useEffect(() => {
    setNodes(initNodes);
    setEdges(initEdges);
  }, [initNodes, initEdges]);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          defaultViewport={{ x: 350, y: 100, zoom: 1.2 }}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      {nodeEdge && <EdgeInfoDrewer opened={opened} close={close} edge={nodeEdge?.data} />}
    </>
  );
};

export default RoadmapDiagram;

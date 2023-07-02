const generateNodesAndEdges = (data: any) => {
  const nodes: any[] = [];
  const edges: any[] = [];
  let lastStepId: any = null;

  data.steps.forEach((step: any, index: number) => {
    const stepId = `step${index}`;
    nodes.push({
      id: stepId,
      data: {
        name: step.stepTitle,
        label: step.stepTitle,
        description: step.stepDescription,
        step: index + 1,
        status: step.stepStatus,
        isStep: true,
      },
      type: 'custom',
      position: { x: index === 0 ? -48.5 : 0, y: index * 350 },
    });

    if (lastStepId) {
      edges.push({
        id: `e${lastStepId}-${stepId}`,
        source: lastStepId,
        target: stepId,
        type: 'smoothstep',
      });
    }

    const topicWidth = 150;
    step.topics.forEach((topic: any, topicIndex: number) => {
      const topicId = `topic${index}-${topicIndex}`;
      nodes.push({
        id: topicId,
        data: {
          name: topic.topicName,
          label: topic.topicName,
          description: topic.topicDescription,
          resources: topic.topicResources,
          step: topicIndex + 1,
          status: topic.topicStatus,
          isStep: false,
          topicIndex,
          stepIndex: index,
        },
        type: 'custom',
        position: {
          x: (topicIndex * topicWidth - ((step.topics.length - 1) * topicWidth) / 2) * 1.7,
          y: index === 0 ? 200 : index * 400 + 80,
        },
      });

      edges.push({
        id: `e${stepId}-${topicId}`,
        source: stepId,
        target: topicId,
        type: 'smoothstep',
      });
    });

    lastStepId = stepId;
  });

  return { nodes, edges };
};

export default generateNodesAndEdges;

import React from 'react';

import {
  Badge,
  Drawer,
  Group,
  Select,
  Title,
  Text,
  Stack,
  List,
  Anchor,
  Button,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import QuizModal from './QuizModal';

export const EdgeStatus = {
  notStarted: 1,
  inProgress: 2,
  completed: 3,
};

const EdgeInfoDrewer = ({
  opened,
  close,
  edge,
  data,
}: {
  opened: boolean;
  close: () => void;
  edge: any;
  data: any;
}): JSX.Element => {
  // function changeTopicStatus(
  //   stepIndex: number,
  //   topicIndex: number,
  //   changedStatus: any,
  //   obj: any,
  // ): any {
  //   if (obj.steps[stepIndex] && obj.steps[stepIndex].topics[topicIndex]) {
  //     obj.steps[stepIndex].topics[topicIndex].status = changedStatus;
  //   } else {
  //     return;
  //   }
  //   return obj;
  // }

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [status, setStatus] = React.useState(EdgeStatus.notStarted);

  React.useEffect(() => {
    setStatus(edge.status);
  }, []);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position='right'
        color='#3371CD'
        styles={{ content: { background: '#3371CD' }, header: { background: '#3371CD' } }}
      >
        <Stack px='xl'>
          <Group>
            <Badge
              size='lg'
              variant='filled'
              radius='sm'
              leftSection={<Title order={2}>·</Title>}
              styles={{
                root: {
                  height: '1.95rem',
                },
              }}
            >
              Status
            </Badge>
            <Select
              placeholder='Pick one'
              size='xs'
              value={status.toString()}
              onChange={value => {
                if (!value) return;
                setStatus(+value);
                // const updatedData = changeTopicStatus(
                //   data.stepIndex,
                //   data.topicIndex,
                //   value,
                //   data.data,
                // );
                // console.log(updatedData);
              }}
              data={[
                { value: EdgeStatus.notStarted.toString(), label: 'Not Started' },
                { value: EdgeStatus.inProgress.toString(), label: 'In Progress' },
                { value: EdgeStatus.completed.toString(), label: 'Completed' },
              ]}
              styles={{
                input: {
                  background: '#5A8AD1',
                  border: 'none',
                  color: 'white',
                  '::placeholder': {
                    color: 'white',
                  },
                },
              }}
              sx={{ color: 'white' }}
            />
          </Group>
          {edge?.name && <Title color='white'>{edge.name}</Title>}
          {edge?.description && (
            <Text color='white' size='lg'>
              {edge.description}
            </Text>
          )}

          {edge?.resources && edge?.resources.length > 0 && (
            <>
              <Text color='white' fw={700}>
                Resource links:
              </Text>
              <List>
                {edge?.resources.map((resource: any) => (
                  <List.Item key={resource.id}>
                    <Anchor href={resource.resourceLink} color='white'>
                      {resource.resourceName}
                    </Anchor>
                  </List.Item>
                ))}
              </List>
            </>
          )}
          <Button size='lg' radius='md' variant='light' onClick={openModal}>
            Take a Quiz
          </Button>
        </Stack>
      </Drawer>
      {openedModal && (
        <QuizModal
          opened={openedModal}
          close={closeModal}
          topicTitle={openedModal ? edge?.name : undefined}
        />
      )}
    </>
  );
};

export default EdgeInfoDrewer;

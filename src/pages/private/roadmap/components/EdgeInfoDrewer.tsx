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
import useQuiz from '../../../../query/quizz';

export const EdgeStatus = {
  notStarted: 1,
  inProgress: 2,
  completed: 3,
};

const EdgeInfoDrewer = ({
  opened,
  close,
  edge,
}: {
  opened: boolean;
  close: () => void;
  edge: any;
}): JSX.Element => {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
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
              // use EdgeStatus enum here
              data={[
                { value: EdgeStatus.notStarted.toString(), label: 'Not Started' },
                { value: EdgeStatus.inProgress.toString(), label: 'In Progress' },
                { value: EdgeStatus.completed.toString(), label: 'Completed' },
              ]}
              defaultValue={EdgeStatus.notStarted.toString()}
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
          <Button size='lg' radius='md'>
            Next Topic
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

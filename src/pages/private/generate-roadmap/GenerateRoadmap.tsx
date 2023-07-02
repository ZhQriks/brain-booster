import React, { useState, useEffect } from 'react';

import { Button, Container, Group, Stack, TextInput, useMantineTheme } from '@mantine/core';
import Loading from 'pages/shared/Loading';
import useCreateRoadmap from 'query/createRoadmap';

const GenerateRoadmap = (): JSX.Element => {
  const mantineTheme = useMantineTheme();
  const [placeholder, setPlaceholder] = useState('');
  const sentences = ['I want to become a mathematician', 'I want to get into Harvard'];
  const [prompt, setPrompt] = useState<string>('');

  const createRoadmap = useCreateRoadmap();

  useEffect(() => {
    let currentSentence = 0;
    let index = 0;
    let currentChar = '';

    const type = () => {
      currentChar = sentences[currentSentence].slice(0, index++);
      setPlaceholder(currentChar);
      if (currentChar.length === sentences[currentSentence].length) {
        currentSentence = currentSentence === sentences.length - 1 ? 0 : currentSentence + 1;
        index = 0;
        setTimeout(type, 2000);
      } else {
        setTimeout(type, 100);
      }
    };
    type();
  }, []);

  const handleSubmit = (): void => {
    if (prompt === '') {
      return;
    }

    const data: any = `{
      title: prompt,
    }`;
    createRoadmap.mutate(data, {
      onSuccess: (res: any) => {
        res.json().then((body: any) => {
          const { id } = body;
          window.location.href = `/roadmap/${id}`;
        });
      },
    });
  };

  if (createRoadmap.isLoading) {
    return <Loading />;
  }

  return (
    <Stack p='xl' spacing={50} mt={300}>
      <TextInput
        size='lg'
        placeholder={placeholder}
        withAsterisk
        miw={500}
        radius='md'
        color='#3371CD'
        mx='auto'
        value={prompt}
        onChange={event => setPrompt(event.currentTarget.value)}
      />
      <Button miw={280} mx='auto' size='lg' variant='light' radius='lg' onClick={handleSubmit}>
        Continue
      </Button>
    </Stack>
  );
};

export default GenerateRoadmap;

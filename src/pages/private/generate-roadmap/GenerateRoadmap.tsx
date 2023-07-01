import React, { useState, useEffect } from 'react';

import {Button, Container, Group, Stack, TextInput, useMantineTheme } from '@mantine/core';

const GenerateRoadmap = (): JSX.Element => {
  const mantineTheme = useMantineTheme();
  const [placeholder, setPlaceholder] = useState('');
  const sentences = ['I want to become a mathematician', 'I want to get into Harvard'];

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
      />
        <Button miw={280} mx='auto' size='lg' variant='light' radius='lg'>Continue</Button>
    </Stack>
  );
};

export default GenerateRoadmap;

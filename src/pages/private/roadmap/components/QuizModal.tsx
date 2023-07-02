import React, { useEffect, useState } from 'react';

import { Button, Group, Modal, Paper, Radio, Stack, Text, Title } from '@mantine/core';
import { RadioGroup } from '@mantine/core/lib/Radio/RadioGroup/RadioGroup';
import Loading from 'pages/shared/Loading';
import useQuiz from 'query/quizz';

const QuizModal = ({
  opened,
  close,
  topicTitle,
}: {
  opened: boolean;
  close: () => void;
  topicTitle?: string;
}): JSX.Element => {
  const quiz = useQuiz(topicTitle);
  const [selected, setSelected] = useState<Array<string>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answersCorrect, setAnswersCorrect] = useState<number>();

  const [seconds, setSeconds] = useState(0);
  const loadingTexts = [
    'Starting',
    'AI woke up',
    'Analyzing questions',
    'Connecting databases',
    'Almost there',
    'Loading Interface',
    'Verifying data',
    'Ready to start!',
  ];

  const handleSelectionChange = (questionIndex: number, answerIndex: string): void => {
    const newSelected = [...selected];
    newSelected[questionIndex] = answerIndex;
    setSelected(newSelected);
  };

  const checkAnswers = (): void => {
    let correctCount = 0;

    quiz.data.tests.forEach((question: any, index: number) => {
      if (+selected[index] === question.RightAnswer) {
        correctCount++;
      }
    });
    setAnswersCorrect(correctCount);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (quiz.isLoading) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quiz.isLoading]);

  const loadingText = loadingTexts[Math.floor(seconds / 3)] || 'Ready to start!';

  if (quiz.isLoading) {
    return (
      <Modal opened={opened} onClose={close} title={topicTitle} size='xl'>
        <Stack mt={100} mb={100}>
          <Loading />
          <Title mt={100} order={2} align='center'>
            {loadingText}
          </Title>
        </Stack>
      </Modal>
    );
  }

  return (
    <Modal opened={opened} onClose={close} title={topicTitle || ''} size='xl'>
      <Stack px='xl' py='sm' spacing='lg'>
        {!isSubmitted ? (
          quiz?.data?.tests &&
          quiz.data?.tests.map((question: any, index: number) => (
            <Radio.Group
              name={question.questions}
              label={
                <Title order={4} color='#175BC1'>
                  {question.question}
                </Title>
              }
              onChange={(value: string) => handleSelectionChange(index, value)}
            >
              <Stack spacing='xs' mt='md'>
                {question?.Answers &&
                  question.Answers.map((answer: any, answerIndex: number) => (
                    <Radio size='md' value={answerIndex.toString()} label={answer} />
                  ))}
              </Stack>
            </Radio.Group>
          ))
        ) : (
          <Title>
            You have answered correctly {answersCorrect} out of {quiz?.data?.tests?.length}{' '}
            questions
          </Title>
        )}
        <Group position='right'>
          {!isSubmitted && (
            <Button onClick={checkAnswers} color='blue'>
              Check answers
            </Button>
          )}
          {isSubmitted && (
            <>
              <Button onClick={close} color='red'>
                Close
              </Button>
              <Button onClick={() => setIsSubmitted(false)} color='blue'>
                Retake
              </Button>
            </>
          )}
        </Group>
      </Stack>
    </Modal>
  );
};

export default QuizModal;

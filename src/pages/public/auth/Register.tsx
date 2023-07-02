import React, { useId } from 'react';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegister } from 'query/auth';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import {notifications} from "@mantine/notifications";

interface FormData {
  email: string;
  username: string;
  phone: string;
  password: string;
}
const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const register = useRegister();
  const id = useId();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      phone: '',
      password: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      username: value => {
        if (value.length < 6) {
          return 'Username must be longer than or equal to 6 characters';
        }
        return null;
      },
    },
  });

  const handleSubmit = (formData: FormData): void => {
    register.mutate(formData, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (error: any) => notifications.show({title: 'Failed to edit name', message: error.message, color: 'red'}),
    });
  };

  return (
    <Container maw='70rem' pt={90}>
      <Paper radius='md' p='xl' withBorder maw='30rem' mx='auto' mt='md'>
        <Text size='lg' weight={500} align='center'>
          Добро пожаловать!
        </Text>

        <Divider label='Создайте аккаунт' labelPosition='center' my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label='Почта'
              placeholder='janibek@gmail.com'
              {...form.getInputProps('email')}
              radius='md'
            />
            <TextInput
              required
              label='Никнейм'
              placeholder='Ваш никнейм'
              {...form.getInputProps('username')}
              radius='md'
            />
            <Input.Wrapper id={id} label='Телефон' required>
              <Input<any>
                component={IMaskInput}
                mask='+7 (000) 000-00-00'
                id={id}
                placeholder='Ваш номер'
                {...form.getInputProps('phone')}
                radius='md'
              />
            </Input.Wrapper>

            <PasswordInput
              required
              label='Пароль'
              placeholder='Your password'
              {...form.getInputProps('password')}
              radius='md'
            />
          </Stack>

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => navigate('/login')}
              size='sm'
            >
              Есть аккаунт? Войдите
            </Anchor>
            <Button type='submit' radius='lg' color='blue'>
              Зарегистрироваться
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;

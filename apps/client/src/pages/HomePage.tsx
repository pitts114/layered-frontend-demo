import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increment, decrement, selectCount, selectUser } from '@layered-frontend-demo/domain';
import { Button, Box, Text, Heading, Flex, Stack } from '@layered-frontend-demo/ui-components';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../App.css';

export const HomePage = () => {
  const count = useAppSelector(selectCount);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Box as="main" padding={8}>
      <Stack direction="vertical" spacing={8} align="center">
        <Text variant="body2" color="muted" align="center">
          Logged in as:{' '}
          <Text as="span" weight="semibold">
            {user?.email}
          </Text>
        </Text>

        <Flex justify="center" gap={0}>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </Flex>

        <Heading level={1} align="center">
          Vite + React
        </Heading>

        <Box padding={8}>
          <Stack direction="vertical" spacing={4} align="center">
            <Flex justify="center" gap={2}>
              <Button onClick={() => dispatch(increment())}>Increment</Button>
              <Button onClick={() => dispatch(decrement())}>Decrement</Button>
            </Flex>
            <Text align="center">Count: {count}</Text>
          </Stack>
        </Box>

        <Text variant="body2" color="muted" align="center">
          Click on the Vite and React logos to learn more
        </Text>
      </Stack>
    </Box>
  );
};

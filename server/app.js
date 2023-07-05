import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Container,
  VStack,
  Center,
} from '@chakra-ui/react';
import './App.css';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [shayari, setShayari] = useState('');

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleGenerateClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/generate?type=Shayari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      if (response.ok) {
        const data = await response.json();
        setShayari(data.join('\n'));
      } else {
        console.log('Error:', response.statusText);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <Center minH="100vh" bg="gray.100">
      <Container maxW="sm" p={4} bg="white" rounded="md" shadow="md">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Shayari Generator
          </Heading>
          <Input
            placeholder="Enter a keyword"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <Button
            colorScheme="teal"
            onClick={handleGenerateClick}
            isDisabled={!keyword}
          >
            Generate Shayari
          </Button>
          {shayari && (
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontWeight="bold" mb={2}>
                Generated Shayari:
              </Text>
              <Text>{shayari}</Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Center>
  );
};

export default App;

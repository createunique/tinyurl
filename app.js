import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);

  const shortenUrl = async () => {
    setError(null); // Reset the error state before each request
    try {
      const response = await fetch('https://tinyurl.vercel.app/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setShortUrl(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <View>
      <TextInput
        value={url}
        onChangeText={setUrl}
        placeholder="Enter URL"
      />
      <Button onPress={shortenUrl} title="Shorten URL" />
      {shortUrl && (
        <Text>Shortened URL: {shortUrl}</Text>
      )}
      {error && (
        <Text>Error: {error}</Text>
      )}
    </View>
  );
}

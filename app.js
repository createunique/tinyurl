import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.text();
      setShortUrl(data);
    } catch (error) {
      console.error('Error:', error);
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
    </View>
  );
}

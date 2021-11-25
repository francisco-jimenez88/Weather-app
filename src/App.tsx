import React, { useState } from 'react';
import { Box, Heading, Input, Button, Center, Image } from '@chakra-ui/react';
import PresentWeather from './components/PresentWeather';

const App: React.FC = () => {
  const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    city: '',
    description: '',
    icon: '',
    temp: '',
    feels_like: '',
    humidity: '',
    wind: '',
  });

  async function getWeather() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          city: data.name,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        });
        console.log(data);
      });
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <>
      <Image
        src="/torresDelPaine.jpg"
        alt="Torres Del Paine, Chile"
        w="100vw"
        h="100vh"
        style={{
          opacity: '.7',
        }}
      />
      <Box
        textAlign="center"
        bg="gray.700"
        w="100vw"
        h="100vh"
        color="whiteAlpha.900"
        backgroundImage="url('/clouds.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Heading as="h2" size="2xl" pt="10">
          Enter a city
        </Heading>
        <Center w="30%" m="auto" p="10">
          <Input
            fontSize="2xl"
            variant="flushed"
            placeholder="Enter city"
            color="white"
            onChange={(e) => setCity(e.target.value)}
            onKeyUp={onKeyUp}
          />
          <Button bg="lightgray" ml="5" w="150px" onClick={getWeather}>
            Search
          </Button>
        </Center>
        <PresentWeather weather={weather} />
      </Box>
    </>
  );
};

export default App;

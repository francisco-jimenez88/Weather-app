import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Image,
  Center,
} from '@chakra-ui/react';
import PresentWeather from './PresentWeather';

export interface WeatherData {
  city: string;
  description: string;
  icon: string;
  temp: string;
  feels_like: string;
  humidity: string;
  wind: string;
}

const SelectCity: React.FC = () => {
  const APIKEY = '8501e1b543e12f06741507b0e99f50a9';
  const DAYS = 5;

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData>({
    city: '',
    description: '',
    icon: '',
    temp: '',
    feels_like: '',
    humidity: '',
    wind: '',
  });

  console.log(weather);

  /*  `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${DAYS}&units=metric&appid=${APIKEY}`; */

  async function getWeather() {
    const apiData = await fetch(
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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box bg="gray.300" w="100%" h="20vh" p={4} color="white">
      <Heading as="h1" size="2xl">
        Weather app
      </Heading>
      <Center w="50%">
        <Input
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <Button bg="tomato" onClick={getWeather}>
          sök
        </Button>
      </Center>
      <Text>Weather</Text>
      {weather.city && (
        <Text>Chosen city: {capitalizeFirstLetter(weather.city)}</Text>
      )}
      {weather.description && (
        <Text>Description: {capitalizeFirstLetter(weather.description)}</Text>
      )}
      {weather.temp && (
        <Text>Temperature: {Math.round(parseInt(weather.temp, 10))} °C</Text>
      )}
      {weather.feels_like && (
        <Text>
          Feels like: {Math.round(parseInt(weather.feels_like, 10))} °C
        </Text>
      )}
      {weather.humidity && <Text>Humidity: {weather.humidity} %</Text>}
      {weather.wind && <Text>Wind: {weather.wind} m/s</Text>}
      {weather.icon && (
        <Center justifyContent-center>
          <Image
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          />
        </Center>
      )}
    </Box>
  );
};

export default SelectCity;

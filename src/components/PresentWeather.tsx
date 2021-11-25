import { Text, Image, Center, Heading, Flex } from '@chakra-ui/react';
import React from 'react';

export interface WeatherDataProps {
  weather: WeatherType;
}

type WeatherType = {
  city: string;
  description: string;
  icon: string;
  temp: string;
  feels_like: string;
  humidity: string;
  wind: string;
};

const PresentWeather: React.FC<WeatherDataProps> = ({ weather }) => {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Flex
        justifyContent="center"
        flexDir="row"
        bg="white.500"
        w="100%"
        h="20vh"
        margin="auto"
        p={4}
        color="whiteAlpha.900"
        borderRadius="md"
      >
        {weather.icon && (
          <Center>
            <Image
              boxSize="200px"
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            />
          </Center>
        )}
        <Flex flexDir="column" justifyContent="center">
          <Heading as="h1" pl={40} fontWeight="medium">
            {capitalizeFirstLetter(weather.city)}
          </Heading>
          <Heading as="h2" fontSize="6xl" pl={40} fontWeight="medium">
            {weather.temp === ''
              ? ''
              : `${Math.round(parseInt(weather.temp, 10))} °C`}
          </Heading>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-around"
        flexDir="row"
        bg="white.500"
        w="100%"
        h="auto"
        p={4}
        mt="200px"
        color="whiteAlpha.900"
        borderRadius="md"
        flexDirection="row"
      >
        {weather.description && (
          <>
            <Flex flexDir="column">
              <Text
                as="p"
                fontSize="l"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Description
              </Text>
              <Text as="p" fontSize="3xl" fontWeight="medium">
                {capitalizeFirstLetter(weather.description)}
              </Text>
            </Flex>
          </>
        )}

        {weather.temp && (
          <>
            <Flex flexDir="column">
              <Text
                as="p"
                fontSize="l"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Temperature
              </Text>
              <Text as="p" fontSize="3xl" fontWeight="medium">
                {Math.round(parseInt(weather.temp, 10))} °C
              </Text>
            </Flex>
          </>
        )}

        {weather.feels_like && (
          <>
            <Flex flexDir="column">
              <Text
                as="p"
                fontSize="l"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Feels like
              </Text>
              <Text as="p" fontSize="3xl" fontWeight="medium">
                {Math.round(parseInt(weather.feels_like, 10))} °C
              </Text>
            </Flex>
          </>
        )}

        {weather.humidity && (
          <>
            <Flex flexDir="column">
              <Text
                as="p"
                fontSize="l"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Humidity
              </Text>
              <Text as="p" fontSize="3xl" fontWeight="medium">
                {weather.humidity} %
              </Text>
            </Flex>
          </>
        )}

        {weather.wind && (
          <>
            <Flex flexDir="column">
              <Text
                as="p"
                fontSize="l"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Wind
              </Text>
              <Text as="p" fontSize="3xl" fontWeight="medium">
                {weather.wind} m/s
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default PresentWeather;

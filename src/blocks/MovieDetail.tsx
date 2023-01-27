import {
  Image,
  Heading,
  Flex,
  Text,
  Skeleton,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import { ViewOffIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";

export type MovieWithDetail = { 
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string, 
  Ratings: [
    { Source: string, Value: string }
  ],
  Metascore: string, 
  imdbRating: string,
  imdbVotes: string,
  imdbID: string, 
  Type: string, 
  DVD?: string, 
  BoxOffice?: string,
  Production?: string, 
  Website?: string, 
  Response?: string 
}

const baseTextPartStyle = {
  h: 5,
  ml: { base: '0', sm: '5' },
  mt: 0,
  mb: 5,
  minW: { base: '50%' }
}

const MovieDetail = ({ movie, loading, onClick }: { movie?: MovieWithDetail, loading: boolean, onClick?: () => void }) => {
  const [src, setSrc] = useState<string | undefined>(movie?.Poster || '')
  // Control errors
  useEffect(() => {
    setSrc(movie?.Poster)
  }, [movie?.Poster])

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      wrap={'wrap'}
      alignItems={"start"}
      p='2'
    >
      <Box w={{base:'100%', sm: '30%'}} minH='380px'>
        <AspectRatio ratio={11 / 16}>
          <Skeleton h="100%" w='100%' isLoaded={!loading} >
              {src && <Image
                src={src}
                onError={() => setSrc('')}
                srcSet={src}
                loading="lazy"
                alt={movie?.Title}
                borderRadius="xs"
              />}
              {!src && <ViewOffIcon boxSize={8} />}
          </Skeleton>
        </AspectRatio>
      </Box>
      
      <Flex w={{ base: '100%', sm: '70%' }} maxW={{ base: '500px'}} alignItems={"start"} flexDirection={'column'} flexGrow={1} mt='5'>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Heading size="lg" noOfLines={1}>
            {movie?.Title}
          </Heading>
        </Skeleton>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text color="blue.600" fontSize="bg">
            {movie?.Year}
          </Text>
        </Skeleton>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text>{movie?.Type}</Text>
        </Skeleton>
        <Skeleton sx={{
          ...baseTextPartStyle,
          h: 'auto',
          minW: { base: '100%', sm: 'calc(100% - 16px)' },
          maxW: { base: '100%', sm: 'calc(100% - 16px)' },
          minH: { base: '140px', md: '360px'},
          mb: '16px'
        }} isLoaded={!loading}>
          <Text>{movie?.Plot}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

export default MovieDetail;

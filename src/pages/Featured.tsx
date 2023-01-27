import { useEffect } from "react";
import { VStack, IconButton, Heading, Flex, Box  } from '@chakra-ui/react'
import { Search2Icon, StarIcon } from '@chakra-ui/icons'
import { useFetchData, FetchHookAPI, DEFAULT_TOKEN } from '../blocks/fetchHook';
import { useNavigate } from "react-router-dom"

import Header from '../blocks/Header';
import MovieDetail, { MovieWithDetail } from "../blocks/MovieDetail";


const FEATURED_ITEM_1 = ['tt0266987']
const FEATURED_ITEM_2 = ['tt1340800']


const FeaturedMovie = ({ movieHook }: { movieHook: FetchHookAPI<MovieWithDetail> }) => {
  const [loading, error, movie] = movieHook
  // TODO control errors
  let navigate = useNavigate();
  return (<Box
    minW={{ base: '100%', sm: '50%' }}
    onClick={() => navigate(`/detail/${movie?.imdbID}`)}
    sx={{ cursor: 'pointer' }}
  >
    <MovieDetail loading={loading} movie={movie} />
  </Box>)
}

const Featured = () => {
  const movieOne = useFetchData<MovieWithDetail>()
  const movieTwo = useFetchData<MovieWithDetail>()
  let navigate = useNavigate();

  useEffect(() => {
    movieOne[3](`https://www.omdbapi.com/?i=${FEATURED_ITEM_1}&apiKey=${DEFAULT_TOKEN}`)
    movieTwo[3](`https://www.omdbapi.com/?i=${FEATURED_ITEM_2}&apiKey=${DEFAULT_TOKEN}`)
  }, [])

  return (
    <VStack
      spacing={0}
      sx={{
        width: '100%',
        minHeight: '100vh',
        margin: '0',
        padding: '0'
      }}
    >
      <Header>
        <StarIcon h='10' />
        <Heading size="lg" noOfLines={1}>
          OMDB Display
        </Heading>
        <IconButton aria-label='Go back' icon={<Search2Icon />} onClick={() => { navigate('/search') }} variant={'ghost'}></IconButton>
      </Header>
      <Flex flexDirection='row' wrap='wrap' w='100%'>
        <Heading size="bg" noOfLines={1} w='100%' textAlign={'center'} mb='3'>
          Featured this week: Spyes everywhere!
        </Heading>
        <FeaturedMovie movieHook={movieOne} />
        <FeaturedMovie movieHook={movieTwo} />
      </Flex>
    </VStack>
  );
}

export default Featured

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import {
  Flex,
  IconButton
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { useFetchData, DEFAULT_TOKEN } from '../blocks/fetchHook';
import MovieDetail, { MovieWithDetail } from "../blocks/MovieDetail";
import Header from "../blocks/Header";

const MovieCard = () => {
  const [loading, error, movie, getDetail] = useFetchData<MovieWithDetail>()
  let params = useParams();
  let navigate = useNavigate();
  // todo make skeletons on loading
  // todo add more details
  // todo avoid card
  useEffect(() => {
    if (params.imdbid) getDetail(`https://www.omdbapi.com/?i=${params.imdbid}&plot=${'full'}&apiKey=${DEFAULT_TOKEN}`)
  }, [params.imdbid])

  return (
    <Flex w='100%' h={'100%'} flexDirection='column'>
      <Header>
        <IconButton aria-label='Go back' icon={<ArrowBackIcon />} onClick={() => {navigate(-1)}} variant={'ghost'}></IconButton>
      </Header>
      <MovieDetail movie={movie} loading={loading} />
    </Flex>
  );
}

export default MovieCard;

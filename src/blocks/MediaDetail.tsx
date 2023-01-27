import {
  Image,
  Heading,
  Flex,
  Text,
  Skeleton,
  Box,
  AspectRatio,
  Badge,
  List,
  ListItem,
  ListIcon,
  IconButton
} from "@chakra-ui/react";
import { ViewOffIcon, ChevronDownIcon, ChevronUpIcon, StarIcon, EditIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchData, DEFAULT_TOKEN } from './fetchHook';

export type MediaWithDetail = { 
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

const Poster = ({ poster, title, loading }: { poster?: string, title?: string, loading?: boolean }) => {
  const [src, setSrc] = useState<string | undefined>(poster || '')

  useEffect(() => {
    setSrc(poster)
  }, [poster])

  return (<Box w={{ base: '100%', sm: '40%' }} maxH='445px' maxW='300px'>
    <AspectRatio ratio={11 / 16}>
      <Skeleton h="100%" w='100%' isLoaded={!loading} >
        {src && <Image
          src={src}
          onError={() => setSrc('')}
          srcSet={src}
          loading="lazy"
          alt={title}
          borderRadius="xs"
        />}
        {!src && <ViewOffIcon boxSize={8} />}
      </Skeleton>
    </AspectRatio>
  </Box>)
}

const getColorByRate = (rate?: string) => {
  const rating = parseInt(rate || '0', 10)
  if (rating >= 7) return 'green'
  if (rating >= 5) return 'purple'
  return 'red'
}

const baseTextPartStyle = {
  minH: 5,
  ml: { base: '0', sm: '5' },
  mt: 0,
  mb: 3,
  minW: { base: '50%' }
}

const MediaDetail = ({ mediaID, info = 'basic' }: { mediaID?: string, info?: 'basic' | 'full' }) => {
  // TODO Control errors
  const [loading, error, media, getMedia] = useFetchData<MediaWithDetail>(
    `https://www.omdbapi.com/?i=${mediaID}&plot=full&apiKey=${DEFAULT_TOKEN}`
  )

  const [more, setMore] = useState<boolean>(false)
  let navigate = useNavigate();

  useEffect(() => {
    getMedia()
  }, [])

  const fullInfo = info === 'full'

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      wrap={'wrap'}
      alignItems={"start"}
      minW={{base: '350px', sm: '450px'}}
      p='2'
    >
      <Poster title={media?.Title} poster={media?.Poster} loading={loading} />
      
      <Flex w={{ base: '100%', sm: '60%' }} maxW={{ base: '500px'}} alignItems={"start"} flexDirection={'column'} flexGrow={1} mt='5'>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Heading
            size="lg"
            noOfLines={1}
            onClick={() => navigate(`/detail/${media?.imdbID}`)}
            sx={{ cursor: 'pointer' }}
          >
            {media?.Title}
          </Heading>
          <Badge mt='3'
            colorScheme={getColorByRate(media?.imdbRating)}
          >
            {media?.imdbRating}
          </Badge>
        </Skeleton>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text color="blue.600" fontSize="bg">
            {media?.Year} ({media?.Released})
          </Text>
        </Skeleton>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text>{media?.Type} - {media?.Genre}</Text>
        </Skeleton>
        <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text>{media?.Awards}</Text>
        </Skeleton>
        {fullInfo && <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text>Director: {media?.Director}</Text>
        </Skeleton>}
        {fullInfo && <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text>Cast:</Text>
          <List>{media?.Actors.split(/\,\s/ig).map(actor => (
            <ListItem key={actor}>
              <ListIcon as={StarIcon}></ListIcon>
              <Text as='span' fontSize='xs'>{actor}</Text>
            </ListItem>
          ))}</List>
        </Skeleton>}
        {fullInfo && <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
          <Text>Writer/s:</Text>
          <List>{media?.Writer.split(/\,\s/ig).map(writer => (
            <ListItem key={writer}>
              <ListIcon as={EditIcon}></ListIcon>
              <Text as='span' fontSize='xs'>{writer}</Text>
            </ListItem>
          ))}</List>
        </Skeleton>}
        
        <Skeleton sx={{
          ...baseTextPartStyle,
          h: 'auto',
          minW: { base: '100%', sm: 'calc(100% - 16px)' },
          maxW: { base: '100%', sm: 'calc(100% - 16px)' },
          minH: { base: '70px', md: '100px'},
          mb: '16px'
        }} isLoaded={!loading}>
          <Text fontSize='sm' noOfLines={more ? undefined : 4}>
            {media?.Plot}
          </Text>
          <Flex justifyContent={'center'} width='100%'>
            <IconButton
              aria-label='Go back'
              icon={more ? <ChevronUpIcon /> : <ChevronDownIcon />}
              onClick={() => setMore(!more)}
              variant={'ghost'}
            />
          </Flex>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

export default MediaDetail;

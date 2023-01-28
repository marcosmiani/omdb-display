import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { ViewOffIcon, ChevronDownIcon, ChevronUpIcon, StarIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import { useFetchData, DEFAULT_TOKEN } from './fetchHook'
import ErrorHandler from './ErrorHandler'
import { type PlotType } from './SearchBar'

export interface MediaWithDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: [
    { Source: string, Value: string }
  ]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD?: string
  BoxOffice?: string
  Production?: string
  Website?: string
  Response?: string
}

const baseTextPartStyle = {
  minH: 5,
  ml: { base: '0', sm: '5' },
  mt: 0,
  mb: 5,
  w: { base: '50%' }
}

const Poster: React.FunctionComponent<{ poster?: string, title?: string, loading: boolean }> = ({ poster, title, loading }) => {
  const [src, setSrc] = useState<string | undefined>(poster ?? '')

  useEffect(() => {
    setSrc(poster)
  }, [poster])

  return (<Box w={{ base: '100%', sm: '40%' }} maxH='445px' maxW='300px'>
    <AspectRatio ratio={11 / 16}>
      <Skeleton h="100%" w='100%' isLoaded={!loading} >
        {src !== ''
          ? <Image
            src={src}
            onError={() => { setSrc('') }}
            srcSet={src}
            loading="lazy"
            alt={title}
            borderRadius="xs"
          />
          : <ViewOffIcon boxSize={8} />}
      </Skeleton>
    </AspectRatio>
  </Box>)
}

const Writers: React.FunctionComponent<{ writers?: string, loading: boolean }> = ({ writers, loading }) => {
  const writerCollection: string[] | undefined = writers?.split(/,\s/ig)

  return (<Skeleton
    sx={{
      ...baseTextPartStyle,
      w: { base: 'calc(50% - 16px)' }
    }}
    isLoaded={!loading}
  >
    <Text>Writer/s:</Text>
    <List>{writerCollection?.map(writer => (
      <ListItem key={writer}>
        <ListIcon as={EditIcon}></ListIcon>
        <Text as='span' fontSize='xs'>{writer}</Text>
      </ListItem>
    ))}</List>
  </Skeleton>)
}

const Actors: React.FunctionComponent<{ actors?: string, loading: boolean }> = ({ actors, loading }) => {
  const actorsCollection: string[] | undefined = actors?.split(/,\s/ig)

  return (<Skeleton
    sx={{
      ...baseTextPartStyle,
      maxW: { base: 'calc(50% - 50px)' },
      ml: 0
    }}
    isLoaded={!loading}
    >
    <Text>Actors:</Text>
    <List>{
      actorsCollection?.map(actor => (
        <ListItem key={actor}>
          <ListIcon as={StarIcon}></ListIcon>
          <Text as='span' fontSize='xs'>{actor}</Text>
        </ListItem>
      ))}</List>
  </Skeleton>)
}

const Plot: React.FunctionComponent<{ loading: boolean, plot?: string, type?: 'full' | 'short' }> = ({
  loading, plot, type = 'short'
}) => {
  const [more, setMore] = useState<boolean>(false)

  return (
    <Skeleton sx={{
      h: 'auto',
      minW: { base: '100%', sm: 'calc(100% - 16px)' },
      maxW: { base: '100%', sm: 'calc(100% - 16px)' },
      minH: { base: '70px', md: '100px' },
      mb: '16px'
    }} isLoaded={!loading}>
      <Text fontSize='sm' noOfLines={more || type === 'short' ? undefined : 4}>
        {plot}
      </Text>
      <Flex justifyContent={'center'} alignItems='center' width='100%'>
        {type !== 'short' && <IconButton
          aria-label='See more / See less'
          icon={more ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => { setMore(!more) }}
          variant={'ghost'}
        />}
      </Flex>
    </Skeleton>)
}

const getColorByRate = (rate?: string): string => {
  const rating = parseInt(rate ?? '0', 10)
  if (rating >= 7) return 'green'
  if (rating >= 5) return 'purple'
  return 'red'
}

const MediaDetail: React.FunctionComponent<{ mediaID?: string, display?: 'compact' | 'full', plotType?: PlotType, forcedLoading?: boolean }> = (
  { mediaID, display = 'compact', plotType = 'short', forcedLoading = false }
) => {
  const [mediaIsLoading, error, media, getMedia] = useFetchData<MediaWithDetail>(
    `https://www.omdbapi.com/?i=${mediaID ?? ''}&plot=${plotType}&apiKey=${DEFAULT_TOKEN}`
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (mediaID !== undefined && !forcedLoading) {
      getMedia()
    }
  }, [plotType, mediaID, forcedLoading])

  const fullDisplay = display === 'full'
  const loading = (media == null) || mediaIsLoading || forcedLoading

  return (
    <ErrorHandler error={error}>
      <Flex
        w={'100%'}
        h={'100%'}
        wrap={'wrap'}
        alignItems={'start'}
        justifyContent='start'
        minW={{ base: '350px', sm: '450px' }}
        p='2'
      >
        <Poster title={media?.Title} poster={media?.Poster} loading={loading} />

        <Flex
          w={{ base: '100%', sm: '60%' }}
          maxW={{ base: '500px' }}
          alignItems={'start'}
          flexDirection={'column'}
          flexGrow={1}
          mt='5'
        >
          <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
            <Heading
              size="lg"
              noOfLines={1}
              onClick={() => { navigate(`/detail/${media?.imdbID ?? ''}`) }}
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
          {fullDisplay && <Skeleton sx={baseTextPartStyle} isLoaded={!loading}>
            <Text>Director: {media?.Director}</Text>
          </Skeleton>}
        </Flex>
        {fullDisplay && <Flex
          w={{ base: '100%' }}
          alignItems={'start'}
          flexDirection={'row'}
          flexGrow={1}
          mt='5'
        >
          <Actors actors={media?.Actors} loading={loading} />
          <Writers writers={media?.Writer} loading={loading} />
        </Flex>}

        <Flex
          w={{ base: '100%' }}
          h={{ base: '100%' }}
          alignItems={'start'}
          flexDirection={'column'}
          flexGrow={1}
          mt='5'
        >
          <Plot
            plot={media?.Plot}
            loading={loading}
            type={plotType}
          />
        </Flex>

      </Flex>
    </ErrorHandler>
  )
}

export default MediaDetail

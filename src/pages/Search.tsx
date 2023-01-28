import React, { useEffect, useState } from 'react'
import {
  VStack, IconButton,
  SimpleGrid,
  Box,
  Heading,
  Card
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { useFetchData, DEFAULT_TOKEN } from '../blocks/fetchHook'
import Header from '../blocks/Header'

import SearchBar, { type PlotType } from '../blocks/SearchBar'
import ErrorHandler from '../blocks/ErrorHandler'
import MediaDetail from '../blocks/MediaDetail'

interface Media {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  imdbRating: string
}

interface MediaList {
  'Search': Media[]
  'TotalResults': number
}

const Search: React.FunctionComponent = () => {
  const { criteria } = useParams()
  const [search, setSearch] = useState<string | null>(criteria ?? null)
  const [plotType, setPlotType] = useState<PlotType>('short')
  const [loading, error, media, getList] = useFetchData<MediaList>(
    `https://www.omdbapi.com/?s=${search ?? ''}&apiKey=${DEFAULT_TOKEN}`,
    'search'
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (search !== null && search !== '') getList()
  }, [search])

  // TODO handle empty search
  const mediaCollection = loading
    ? [{ imdbID: '1' }, { imdbID: '2' }]
    : (media?.Search ?? [])

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
        <IconButton aria-label='Go back' icon={<ArrowBackIcon />} onClick={() => { navigate(-1) }} variant={'ghost'}></IconButton>
        <SearchBar
          search={search ?? criteria ?? ''}
          plotType={plotType}
          onChange={(search, plotType) => {
            setSearch(search)
            setPlotType(plotType)
            navigate(`/search/${search}`, { replace: true })
          }}
        />
      </Header>
      {search !== null && search !== '' && (
        <ErrorHandler error={error}>
          <Box flexGrow='1' w={'100%'} padding={2}>
            <SimpleGrid
              gap={2}
              minChildWidth={{ base: '100%', lg: 'calc(50% - 32px)' }}
              sx={{
                justifyContent: 'space-between'
              }}
            >
              {mediaCollection.map((mediaItem: Media | { imdbID: string }) =>
                <Card p='2' key={mediaItem.imdbID}>
                  <MediaDetail mediaID={mediaItem.imdbID} forcedLoading={loading} display='full' plotType={plotType} />
                </Card>
              )}
              {!loading && mediaCollection.length !== 0 && <Heading as="h2" textAlign={'center'} >
                These are not the droids you are looking for
              </Heading>}
            </SimpleGrid>
          </Box>
        </ErrorHandler>
      )}
    </VStack>
  )
}

export default Search

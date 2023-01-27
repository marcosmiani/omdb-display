import { useEffect, useState } from "react";
import { VStack, IconButton } from '@chakra-ui/react'
import { useParams, useNavigate } from "react-router-dom"
import { ArrowBackIcon } from '@chakra-ui/icons'

import { useFetchData, DEFAULT_TOKEN } from '../blocks/fetchHook';
import Header from '../blocks/Header';
import MediaGrid from '../blocks/MediaGrid';
import SearchBar from '../blocks/SearchBar';
import { Media } from '../blocks/MediaCard';


export type MediaList = {
  "Search": Media[],
  "TotalResults": Number
}

export type SearchAPI = {
  search: string
}

const Search = () => {
  const { criteria } = useParams()
  const [search, setSearch] = useState<string | null>(criteria || null)
  const [loading, error, media, getList] = useFetchData<MediaList>(
    `https://www.omdbapi.com/?s=${search}&apiKey=${DEFAULT_TOKEN}`,
    'search'
  )
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!!search) getList()
  }, [search])

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
        <SearchBar search={search || criteria || ''} onChange={(evt) => {
          const value = evt.target.value
          setSearch(value)
          navigate(`/search/${value}`, { replace: true })
        }} />
      </Header>
      {search !== null && <MediaGrid media={media} loading={loading} error={error} />}
    </VStack>
  );
}

export default Search

import { useEffect } from "react";
import { VStack, IconButton, Heading, Flex, Box  } from '@chakra-ui/react'
import { Search2Icon, StarIcon } from '@chakra-ui/icons'
import { useFetchData, DEFAULT_TOKEN } from '../blocks/fetchHook';
import { useNavigate } from "react-router-dom"

import Header from '../blocks/Header';
import MediaDetail, { MediaWithDetail } from "../blocks/MediaDetail";


const FEATURED_ITEMS = ['tt0266987','tt1340800']

const FeaturedMedia = ({ mediaID }: { mediaID: string }) => {
  return (<Box
    minW={{ base: '100%', sm: '50%' }}
    flexGrow='1'
  >
    <MediaDetail mediaID={mediaID} />
  </Box>)
}

const Featured = () => {
  let navigate = useNavigate();

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
      <Flex flexDirection='row' wrap='wrap' w='100%' flex='grow'>
        <Heading size="bg" noOfLines={1} w='100%' textAlign={'center'} mb='3'>
          Featured this week: Spyes everywhere!
        </Heading>
        {FEATURED_ITEMS.map(id => <FeaturedMedia key={id} mediaID={id} />)}
      </Flex>
    </VStack>
  );
}

export default Featured

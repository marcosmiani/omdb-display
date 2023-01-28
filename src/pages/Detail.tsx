import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Flex,
  IconButton
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import MediaDetail from '../blocks/MediaDetail'
import Header from '../blocks/Header'

const MediaCard = () => {
  const params = useParams()
  const navigate = useNavigate()
  // todo add more details

  return (
    <Flex w='100%' h='100%' flexDirection='column'>
      <Header>
        <IconButton aria-label='Go back' icon={<ArrowBackIcon />} onClick={() => { navigate(-1) }} variant='ghost' />
      </Header>
      <MediaDetail mediaID={params.imdbid} display='full' plotType='full' />
    </Flex>
  )
}

export default MediaCard

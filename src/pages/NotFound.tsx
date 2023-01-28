import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, IconButton, Heading, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Header from '../blocks/Header'

const MediaCard: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const goBack = (): void => { navigate(-1) }

  return (
    <Flex w='100%' h='100%' flexDirection='column'>
      <Header>
        <IconButton aria-label='Go back' icon={<ArrowBackIcon />} onClick={goBack} variant='ghost' />
      </Header>
      <Flex alignItems='center' flexDirection='column'>
        <Heading>These are not the droids you are looking for..</Heading>
        <Button mt='3' onClick={goBack}>Go back</Button>
      </Flex>
    </Flex>
  )
}

export default MediaCard

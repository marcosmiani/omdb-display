import React, { type ChangeEvent, useRef, useEffect } from 'react'
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Collapse,
  FormControl,
  FormLabel,
  Switch,
  Heading
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

export type PlotType = 'full' | 'short'

const Header: React.FunctionComponent<{ search: string, plotType: PlotType, onChange?: (value: string, plotType: PlotType) => void }> = (
  { search, plotType, onChange }
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.focus?.()
  }, [])

  return (
    <Flex maxW={'100%'} minW='10' wrap={'wrap'} flexGrow='1'>
      {(onChange != null) &&
        <InputGroup>
          <Input
            ref={inputRef}
            placeholder="Type your favourite move here"
            value={search}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const value = evt.target.value
              onChange(value, plotType)
            }}
          />
          <InputRightElement
            w='150px'
          >
            <Flex flexDirection='row' minW={'100px'} alignItems='center'>
              <Search2Icon color='green.500' />
              <FormControl display='flex' alignItems='center' ml='2'>
                <FormLabel htmlFor='plot-type' mb='0' fontSize='xs'>
                  Full plot?
                </FormLabel>
                <Switch
                  id='plot-type'
                  size='sm'
                  onChange={() => { onChange(search, plotType === 'full' ? 'short' : 'full') }}
                  isChecked={plotType === 'full'}
                />
              </FormControl>
            </Flex>
          </InputRightElement>
        </InputGroup>
      }
      <Collapse startingHeight={0} in={search === null || search === ''}>
        <Heading as="h2" minW='100%'>
          Whatcha feeling like watching?
        </Heading>
      </Collapse>
    </Flex>
  )
}

export default Header

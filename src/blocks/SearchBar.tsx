import { ChangeEventHandler, useRef, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Collapse,
  Heading
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

function Header({ search, onChange }: { search?: string, onChange?: ChangeEventHandler<HTMLInputElement> }) {

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.focus?.()
  }, [])

  return (
    <Flex maxW={'100%'} minW='10' wrap={'wrap'} flexGrow='1'>
      {onChange &&
        <InputGroup>
          <Input
            ref={inputRef}
            placeholder="Type your favourite move here"
            value={search}
            onChange={onChange}
          />
          <InputRightElement children={<Search2Icon color='green.500' />} />
        </InputGroup>
      }
      <Collapse startingHeight={0} in={!search}>
        <Heading as="h2" minW='100%'>
          Whatcha feeling like watching?
        </Heading>
      </Collapse>
    </Flex>
  );
}

export default Header;

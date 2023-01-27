import {
  Box,
  Flex,
} from '@chakra-ui/react'
import React from 'react';

const Header: React.FunctionComponent<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        wrap: 'nowrap',
        w: '100%',
        margin: '8px'
      }}
    >
      {children}
    </Flex>
  );
}

export default Header;

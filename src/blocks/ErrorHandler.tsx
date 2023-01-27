import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react'
import React from 'react';

const ErrorHandler: React.FunctionComponent<{ error?: Error, children?: React.ReactNode }> = ({ error, children }) => {
  return (
    <>
      {!error && children}
      {error && <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Oh no!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>}
    </>
  );
}

export default ErrorHandler;

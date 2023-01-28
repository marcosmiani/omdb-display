import React from 'react'
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon
} from '@chakra-ui/react'

const ErrorHandler: React.FunctionComponent<{ error?: Error, children?: React.ReactNode }> = ({ error, children }) => {
  return (
    <>
      {(error === null || error === undefined) && children}
      {(error !== null && error !== undefined) && <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Oh no!</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>}
    </>
  )
}

export default ErrorHandler

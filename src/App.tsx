import React from 'react'
import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'

import Detail from './pages/Detail'
import Search from './pages/Search'
import Featured from './pages/Featured'
import NotFound from './pages/NotFound'

const App: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        width: 'calc(100vw - 24px)',
        minHeight: '100vh',
        padding: '0',
        margin: '12px'
      }}
    >
      <Routes>
        <Route path='/' element={<Featured />} />
        <Route path='/search/' element={<Search />} />
        <Route path='/search/:criteria' element={<Search />} />
        <Route path='/detail/:imdbid' element={<Detail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  )
}

export default App

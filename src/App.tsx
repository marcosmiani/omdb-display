import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'

import Detail from './pages/Detail'
import Search from './pages/Search'
import Featured from './pages/Featured'

function NoMatch () {
  return <div>NOT FOUND</div>
}

function App () {
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
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Box>
  )
}

export default App

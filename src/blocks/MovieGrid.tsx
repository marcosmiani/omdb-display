
import {
  SimpleGrid,
  Box,
  Heading,
  Fade
} from '@chakra-ui/react';
import MovieCard, { SkeletonCard, Movie } from './MovieCard';

export type MovieList = {
  "Search": Movie[],
  "TotalResults": Number
}

function MovieGrid({ movies, loading, error }: { movies?: MovieList, loading: boolean, error?: Error }) {
  return (
    <Box flexGrow='1' w={'100%'} padding={2}>
      <SimpleGrid
        gap={2}
        minChildWidth='180px'
        sx={{
          justifyContent: 'start',
        }}
      >
        {([1, 2, 3, 4, 5, 6]).map((_, i) => <SkeletonCard key={i} loading={loading} />)}
        {!loading && movies?.Search?.map((movie: Movie) =>
          <MovieCard key={movie.imdbID} {...movie} />
        )}
        {!loading && !movies?.Search?.length && <Heading as="h2" textAlign={'center'} >
          No movies found
        </Heading>}
        {error && <Heading as="h2" textAlign={'center'} >
          Error!
        </Heading>}
      </SimpleGrid>
    </Box>
  );
}

export default MovieGrid;

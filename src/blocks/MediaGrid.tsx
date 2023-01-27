
import {
  SimpleGrid,
  Box,
  Heading,
  Fade
} from '@chakra-ui/react';
import MediaCard, { SkeletonCard, Media } from './MediaCard';

export type MediaList = {
  "Search": Media[],
  "TotalResults": Number
}

function MediaGrid({ media, loading, error }: { media?: MediaList, loading: boolean, error?: Error }) {
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
        {!loading && media?.Search?.map((mediaItem: Media) =>
          <MediaCard key={mediaItem.imdbID} {...mediaItem} />
        )}
        {!loading && !media?.Search?.length && <Heading as="h2" textAlign={'center'} >
          No media found
        </Heading>}
        {error && <Heading as="h2" textAlign={'center'} >
          Error!
        </Heading>}
      </SimpleGrid>
    </Box>
  );
}

export default MediaGrid;

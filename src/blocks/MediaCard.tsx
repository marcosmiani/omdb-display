import {
  Card,
  CardBody,
  Image,
  Heading,
  VStack,
  HStack,
  Text,
  Skeleton,
  Box,
  Collapse,
  Badge,
  AspectRatio,
} from "@chakra-ui/react";
import { ViewOffIcon } from '@chakra-ui/icons'
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export type Media = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating: string;
};

export const SkeletonCard = ({ loading }: { loading: boolean }) => {
  return (
    <Collapse in={loading}>
      <Card maxW="sm">
        <AspectRatio ratio={10 / 16}>
          <Skeleton height="280px" />
        </AspectRatio>
        <CardBody p={2}>
          <VStack spacing="0" alignItems={"start"}>
            <Heading size="xs" noOfLines={1} width="100%">
              <Skeleton height="20px" />
            </Heading>
            <HStack spacing="3" textAlign={"right"}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Collapse>
  );
}

function MediaCard(media: Media) {
  // todo fix empy images
  const navigate = useNavigate();
  const [src, setSrc] = useState<string>(media?.Poster)
  return (
    <Card
      maxW="sm"
      onClick={() => {
        navigate(`/detail/${media?.imdbID}`)
      }}
    >
      <AspectRatio ratio={11 / 16}>
        <Box>
          {src && <Image
            src={src}
            onError={() => setSrc('')}
            srcSet={src}
            loading="lazy"
            alt={media?.Title}
            borderRadius="xs"
          />}
          {!src && <ViewOffIcon boxSize={8} />}
          {media?.imdbRating && <Badge
            colorScheme='green'
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0
            }}
          >
            {media?.imdbRating}
          </Badge>}
        </Box>
      </AspectRatio>
      <CardBody p={2}>
        <VStack spacing="0" alignItems={"start"}>
          <Heading size="xs" noOfLines={1} width="100%">
            {media?.Title}
          </Heading>
          <HStack spacing="3" textAlign={"right"}>
            <Text color="blue.600" fontSize="bg">
              {media?.Year}
            </Text>
            <Text>{media?.Type}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default MediaCard;

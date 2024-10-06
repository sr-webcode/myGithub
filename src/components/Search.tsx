import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { useRef } from 'react';

type SearchProps = {
  onClickSearch: (searchTerm: string) => void;
};

const Search = ({ onClickSearch }: SearchProps) => {
  const searchElementRef = useRef<HTMLInputElement | null>(null);
  return (
    <HStack marginX="auto" justifyContent="center" spacing={6}>
      <InputGroup flexShrink={0} width="100%" maxW={280}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          ref={searchElementRef}
          placeholder="Search Users..."
        />
      </InputGroup>
      <Button
        maxW={120}
        width="100%"
        flexShrink={0}
        colorScheme="gray"
        onClick={() => onClickSearch(searchElementRef.current?.value || '')}
      >
        Search
      </Button>
    </HStack>
  );
};

export default Search;

import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Checkbox,
  Input,
  VStack,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { searchInDocument } from "../../lib/wordSearch";

export function Taskpane(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSearch = useCallback(async () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      toast({
        title: "Enter a search term",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setResults([]);

    try {
      const textResults = await searchInDocument(trimmed, isCaseSensitive);
      setResults(textResults);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Search failed";
      toast({
        title: "Search error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, isCaseSensitive, toast]);

  return (
    <Box p={4} maxW="md">
      <VStack align="stretch" spacing={4}>
        <Input
          placeholder="Search in document..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          isDisabled={isLoading}
          aria-label="Search query"
        />
        <Checkbox
          isChecked={isCaseSensitive}
          onChange={(e) => setIsCaseSensitive(e.target.checked)}
          isDisabled={isLoading}
        >
          Case Sensitive
        </Checkbox>
        <Button
          colorScheme="blue"
          onClick={handleSearch}
          isLoading={isLoading}
          loadingText="Searching..."
        >
          Search
        </Button>

        <Box w="100%">
          <Text fontWeight="semibold" mb={2} fontSize="sm" color="gray.600">
            Top 3 results
          </Text>
          {results.length === 0 && !isLoading ? (
            <Text fontSize="sm" color="gray.500">
              No results found
            </Text>
          ) : (
            <List spacing={2}>
              {results.map((text, index) => (
                <ListItem
                  key={`result-${index}`}
                  fontSize="sm"
                  p={2}
                  bg="gray.50"
                  borderRadius="md"
                  borderLeft="3px solid"
                  borderColor="blue.400"
                >
                  {text || "(empty)"}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Box, Text, VStack } from "@chakra-ui/react";
import { Taskpane } from "./components/Taskpane";

function WordOnlyMessage(): React.ReactElement {
  return (
    <Box p={6} minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={3} textAlign="center" maxW="md">
        <Text fontSize="lg" fontWeight="semibold">
          This add-in runs in Word only.
        </Text>
        <Text fontSize="sm" color="gray.600">
          Open Microsoft Word, then go to Insert → Add-ins → My Add-ins to load the Word Search Add-in and use the search task pane.
        </Text>
      </VStack>
    </Box>
  );
}

Office.onReady((info) => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element #root not found");
  }
  const root = createRoot(rootElement);
  root.render(
    <ChakraProvider>
      {info.host === Office.HostType.Word ? <Taskpane /> : <WordOnlyMessage />}
    </ChakraProvider>
  );
});

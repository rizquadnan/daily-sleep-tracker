import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Modal } from './components/Modal'
import { HomeForm } from './components/HomeForm'
import { TableContainer, ChartContainer } from './containers'

export function Home() {
  const {
    isOpen: isFormModalOpen,
    onOpen: onOpenFormModal,
    onClose: onCloseFormModal,
  } = useDisclosure()
  return (
    <Container maxW="container.xl">
      <VStack alignItems="stretch" padding="10rem 0" spacing="10">
        <Heading textAlign="center">Home</Heading>

        <Tabs isFitted isLazy>
          <TabList>
            <Tab>Chart</Tab>
            <Tab>Table</Tab>
            <Tab>Side by side</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box minH="300px" minW="300px" data-testid="chart-singular">
                <ChartContainer />
              </Box>
            </TabPanel>
            <TabPanel>
              <TableContainer />
            </TabPanel>
            <TabPanel>
              <Stack
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'stretch', lg: 'center' }}
                justifyContent="stretch"
              >
                <Box
                  flex="1"
                  minH="300px"
                  minW="300px"
                  data-testid="chart-side-by-side"
                >
                  <ChartContainer />
                </Box>
                <Box flex="1">
                  <TableContainer />
                </Box>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button w="100%" colorScheme="orange" onClick={() => onOpenFormModal()}>
          New Entry
        </Button>
      </VStack>

      <Modal
        isOpen={isFormModalOpen}
        onClose={onCloseFormModal}
        title="Add Sleep Data"
      >
        <Box paddingBottom="24px">
          <HomeForm variant="create" onSubmit={() => alert('submit')} />
        </Box>
      </Modal>
    </Container>
  )
}

export default Home

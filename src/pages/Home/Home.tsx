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
import {
  TableContainer,
  ChartContainer,
  ChartGuestModeContainer,
  TableGuestModeContainer,
} from './containers'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'providers'
import { ROUTES } from 'routes'
import { useSubmit } from './hooks'

export function Home() {
  const {
    isOpen: isFormModalOpen,
    onOpen: onOpenFormModal,
    onClose: onCloseFormModal,
  } = useDisclosure()
  const navigate = useNavigate()
  const authContext = useAuth()

  const { isSubmitting, handleSubmit } = useSubmit({
    closeModalCallback: onCloseFormModal,
  })

  return (
    <Container maxW="container.xl">
      <VStack alignItems="stretch" padding="10rem 0" spacing="10">
        <Heading textAlign="center">Home</Heading>

        <Tabs isFitted isLazy>
          <TabList>
            <Tab>Table</Tab>
            <Tab>Chart</Tab>
            <Tab>Side by side</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {authContext.isGuestMode ? (
                <TableGuestModeContainer />
              ) : (
                <TableContainer />
              )}
            </TabPanel>
            <TabPanel>
              <Box minH="300px" minW="300px" data-testid="chart-singular">
                {authContext.isGuestMode ? (
                  <ChartGuestModeContainer />
                ) : (
                  <ChartContainer />
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <Stack
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'stretch', lg: 'center' }}
                spacing={{ base: '24px', lg: 0 }}
                justifyContent="stretch"
              >
                <Box flex="1" data-testid="chart-side-by-side">
                  {authContext.isGuestMode ? (
                    <ChartGuestModeContainer />
                  ) : (
                    <ChartContainer />
                  )}
                </Box>
                <Box flex="1">
                  {authContext.isGuestMode ? (
                    <TableGuestModeContainer />
                  ) : (
                    <TableContainer />
                  )}
                </Box>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <VStack alignItems="stretch">
          <Button
            w="100%"
            colorScheme="orange"
            onClick={() => onOpenFormModal()}
          >
            New Entry
          </Button>
          {authContext.isGuestMode ? (
            <Button
              w="100%"
              variant="ghost"
              onClick={() => {
                authContext.leaveGuestMode()
                navigate(ROUTES.splashScreen)
              }}
            >
              Leave Guest Mode
            </Button>
          ) : (
            <Button
              w="100%"
              variant="ghost"
              onClick={() => {
                authContext.logout()
                navigate(ROUTES.splashScreen)
              }}
            >
              Logout
            </Button>
          )}
        </VStack>
      </VStack>

      <Modal
        isOpen={isFormModalOpen}
        onClose={onCloseFormModal}
        title="Add Sleep Data"
      >
        <Box paddingBottom="24px">
          <HomeForm
            isLoading={isSubmitting}
            variant="create"
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </Container>
  )
}

export default Home

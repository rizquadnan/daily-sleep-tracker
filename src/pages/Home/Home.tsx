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
  BoxProps,
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
import { useAuth, useGuestMode } from 'providers'
import { ROUTES } from 'routes'
import { useSubmit } from './hooks'
import { useMockSleeps, useSleeps } from 'api'
import { ReactNode } from 'react'

export function toYYYYMMDD(ddMmYy: string) {
  const [dd, mm, yy] = ddMmYy.split('-')

  return `${yy}-${mm}-${dd}`
}

export function toMinutesDuration(hhMM: string) {
  const [hh, mm] = hhMM.split(':')

  return Number(hh) * 60 + Number(mm)
}

type TabPanelContentWrapperProps = { children: ReactNode } & BoxProps
function TabPanelContentWrapper({
  children,
  ...rest
}: TabPanelContentWrapperProps) {
  return (
    <Box {...rest} minH={300} minW={300} paddingTop="32px">
      {children}
    </Box>
  )
}

export function Home() {
  const {
    isOpen: isFormModalOpen,
    onOpen: onOpenFormModal,
    onClose: onCloseFormModal,
  } = useDisclosure()
  const navigate = useNavigate()
  const authContext = useAuth()
  const guestModeContext = useGuestMode()

  const { isSubmitting, handleSubmit } = useSubmit({
    closeModalCallback: onCloseFormModal,
  })

  const { handleCreate: handleGuestModeSubmit } = useMockSleeps({})

  const { data, state } = useSleeps({ shouldFetch: false })
  const isEmptyData = data === null

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
              <TabPanelContentWrapper>
                {guestModeContext.isGuestMode ? (
                  <TableGuestModeContainer />
                ) : (
                  <TableContainer />
                )}
              </TabPanelContentWrapper>
            </TabPanel>
            <TabPanel>
              <TabPanelContentWrapper
                minH="300px"
                minW="300px"
                data-testid="chart-singular"
              >
                {guestModeContext.isGuestMode ? (
                  <ChartGuestModeContainer />
                ) : (
                  <ChartContainer />
                )}
              </TabPanelContentWrapper>
            </TabPanel>
            <TabPanel>
              <Stack
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'stretch', lg: 'center' }}
                spacing={{ base: '24px', lg: 0 }}
                justifyContent="stretch"
              >
                {!isEmptyData ||
                  (state === 'error' && (
                    <TabPanelContentWrapper
                      minH="300px"
                      minW="300px"
                      flex="1"
                      data-testid="chart-side-by-side"
                    >
                      {guestModeContext.isGuestMode ? (
                        <ChartGuestModeContainer />
                      ) : (
                        <ChartContainer />
                      )}
                    </TabPanelContentWrapper>
                  ))}
                <TabPanelContentWrapper minH="300px" minW="300px" flex="1">
                  {guestModeContext.isGuestMode ? (
                    <TableGuestModeContainer />
                  ) : (
                    <TableContainer />
                  )}
                </TabPanelContentWrapper>
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
          {guestModeContext.isGuestMode ? (
            <Button
              w="100%"
              variant="ghost"
              onClick={() => {
                guestModeContext.leaveGuestMode()
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
          {guestModeContext.isGuestMode ? (
            <HomeForm
              variant="create"
              onSubmit={(formValues) => {
                handleGuestModeSubmit({
                  formValues,
                  formatDate: toYYYYMMDD,
                  formatDuration: toMinutesDuration,
                  closeModalCallback: onCloseFormModal,
                })
              }}
            />
          ) : (
            <HomeForm
              isLoading={isSubmitting}
              variant="create"
              onSubmit={handleSubmit}
            />
          )}
        </Box>
      </Modal>
    </Container>
  )
}

export default Home

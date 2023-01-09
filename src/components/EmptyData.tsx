import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import emptyData from '../assets/emptyData.svg'

export function EmptyData() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <VStack>
        <Box h={200} w={200}>
          <Image src={emptyData}></Image>
        </Box>
        <Text>No data. Add your sleep data below!</Text>
      </VStack>
    </Flex>
  )
}

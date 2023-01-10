import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, IconButton, useColorMode } from '@chakra-ui/react'

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex justifyContent="flex-end" padding="24px" position="fixed" right="0">
      {colorMode === 'dark' ? (
        <IconButton
          aria-label="Change to light mode"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          aria-label="Change to dark mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
        />
      )}
    </Flex>
  )
}

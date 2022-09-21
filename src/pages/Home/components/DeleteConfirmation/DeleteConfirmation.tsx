import { Button, ButtonGroup, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export type DeleteConfirmationProps = {
  onClickNo(): void
  onClickYes(): void
}
function DeleteConfirmation(props: DeleteConfirmationProps) {
  return (
    <VStack alignItems="stretch" paddingBottom="24px" spacing="12px">
      <Text>Are you sure to delete this data ?</Text>
      <ButtonGroup w="100%">
        <Button flex="1" onClick={props.onClickNo}>
          No
        </Button>
        <Button flex="1" onClick={props.onClickYes}>
          Yes
        </Button>
      </ButtonGroup>
    </VStack>
  )
}

export default DeleteConfirmation

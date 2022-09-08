import {
  Modal as ChakraModal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string;
  children: ReactNode;
}
export function Modal(props: ModalProps) {
  return (
    <ChakraModal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalBody>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </ChakraModal>
  )
}

export default Modal

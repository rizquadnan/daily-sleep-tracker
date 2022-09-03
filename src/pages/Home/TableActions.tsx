import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { HStack, IconButton } from '@chakra-ui/react'

type TableActionsProps = {
  onEdit: () => void;
  onDelete: () => void
};

export function TableActions(props: TableActionsProps) {
  return (
    <HStack>
      <IconButton aria-label="Edit row" icon={<EditIcon />} onClick={props.onEdit} />
      <IconButton aria-label="Delete row" icon={<DeleteIcon />} onClick={props.onDelete} />
    </HStack>
  )
}

export default TableActions

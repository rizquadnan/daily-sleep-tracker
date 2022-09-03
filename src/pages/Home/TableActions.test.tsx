import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {TableActions} from './TableActions'

const selectors = {
  editButtonAriaLabel: 'Edit row',
  deleteButtonAriaLabel: 'Delete row' 
}
describe('<TableActions />', () => {
  const setup = () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();
    render(<TableActions onEdit={onEditMock} onDelete={onDeleteMock} />)

    return {
      onEditMock,
      onDeleteMock
    }
  };
  it('renders two buttons', () => {
    setup();

    expect(screen.getAllByRole('button')).toHaveLength(2);
  })

  it('render edit button', () => {
    setup();

    expect(screen.getByLabelText(selectors.editButtonAriaLabel)).toBeInTheDocument();
  })

  it('render delete button', () => {
    setup();

    expect(screen.getByLabelText(selectors.deleteButtonAriaLabel)).toBeInTheDocument();
  })

  it('has clickable edit button', async () => {
    const user = userEvent.setup()
    const { onEditMock } = setup();

    expect(onEditMock).toBeCalledTimes(0);
    await user.click(screen.getByLabelText(selectors.editButtonAriaLabel))
    expect(onEditMock).toBeCalledTimes(1);
  })

  it('has clickable delete button', async () => {
    const user = userEvent.setup()
    const { onDeleteMock } = setup();

    expect(onDeleteMock).toBeCalledTimes(0);
    await user.click(screen.getByLabelText(selectors.deleteButtonAriaLabel))
    expect(onDeleteMock).toBeCalledTimes(1);
  })
})

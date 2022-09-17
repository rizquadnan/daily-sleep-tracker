/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Modal from './Modal'

const Demo = (demoProps: { initialIsOpen: boolean }) => {
  const [isOpen, setIsOpen] = useState(demoProps.initialIsOpen)

  return (
    <div>
      <button
        onClick={() => {
          if (isOpen) {
            setIsOpen(false)
          } else {
            setIsOpen(true)
          }
        }}
      >
        Toggle Modal
      </button>
      <Modal
        isOpen={isOpen}
        title="title"
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <h1>Children</h1>
      </Modal>
    </div>
  )
}

describe('<Modal />', () => {
  it('renders properly', () => {
    render(<Demo initialIsOpen />)

    expect(
      screen.getByRole('heading', { name: 'Children' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('title')).toBeInTheDocument()
  })

  it('opens when the open trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<Demo initialIsOpen={false} />)

    expect(
      screen.queryByRole('heading', { name: 'Children' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText('title')).not.toBeInTheDocument()

    const openTrigger = screen.getByRole('button', { name: 'Toggle Modal' })
    await user.click(openTrigger)

    expect(
      screen.getByRole('heading', { name: 'Children' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('title')).toBeInTheDocument()
  })

  test('closes when the close trigger (inside the modal) is clicked', async () => {
    const user = userEvent.setup()
    render(<Demo initialIsOpen />)

    await user.click(screen.getByLabelText('Close'))

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: 'Children' }),
      ).not.toBeInTheDocument()
    })
  })
})

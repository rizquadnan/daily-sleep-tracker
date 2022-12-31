import { GuestModeState } from 'models'
import { createContext, useContext } from 'react'
import { useLocalStorage } from 'utils'

const GuestModeContext = createContext<
  | (GuestModeState & {
      enterGuestMode: () => void
      leaveGuestMode: () => void
    })
  | undefined
>(undefined)

type AuthProviderProps = {
  children: React.ReactNode
}
export const GuestModeProvider = (props: AuthProviderProps) => {
  const [state, setState] = useLocalStorage<GuestModeState>('guest-mode', {
    isGuestMode: false,
    sleeps: [],
  })

  return (
    <GuestModeContext.Provider
      value={{
        ...state,
        enterGuestMode: () =>
          setState((prev) => ({
            ...prev,
            isGuestMode: true,
          })),
        leaveGuestMode: () =>
          setState((prev) => ({
            ...prev,
            isGuestMode: false,
          })),
      }}
    >
      {props.children}
    </GuestModeContext.Provider>
  )
}

export const useGuestMode = () => {
  const context = useContext(GuestModeContext)

  if (context === undefined) {
    throw new Error('useGuestMode must be used within a GuestModeProvider')
  }

  return context
}

import { MOCK_SLEEPS } from 'api'
import { GuestModeState, Sleep } from 'models'
import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from 'utils'

type TGuestModeContext = GuestModeState & {
  enterGuestMode: () => void
  leaveGuestMode: () => void
  setSleeps: (newSleeps: Sleep[]) => void
}

const GuestModeContext = createContext<TGuestModeContext | undefined>(undefined)

type AuthProviderProps = {
  children: React.ReactNode
}
export const GuestModeProvider = (props: AuthProviderProps) => {
  const [state, setState] = useLocalStorage<GuestModeState>('guest-mode', {
    isGuestMode: false,
    sleeps: MOCK_SLEEPS,
  })

  const value: TGuestModeContext = useMemo(() => {
    return {
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
      setSleeps: (newSleeps) => {
        setState((prev) => ({
          ...prev,
          sleeps: newSleeps,
        }))
      },
    }
  }, [state, setState])

  return (
    <GuestModeContext.Provider value={value}>
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

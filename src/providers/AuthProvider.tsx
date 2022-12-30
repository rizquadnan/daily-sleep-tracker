import { AuthState, User } from 'models'
import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from 'utils'
import { prependTokenWithBearer } from 'utils/session'

const AuthContext = createContext<
  | (AuthState & {
      login: (user: User, token: string) => void
      logout: () => void
      enterGuestMode: () => void
      leaveGuestMode: () => void
    })
  | undefined
>(undefined)

type AuthProviderProps = {
  children: React.ReactNode
}
export const AuthProvider = (props: AuthProviderProps) => {
  const [state, setState] = useLocalStorage<AuthState>('auth', {
    isAuthenticated: false,
    isGuestMode: false,
    user: null,
    token: null,
  })

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: (user, token) =>
          setState((prev) => ({
            ...prev,
            isAuthenticated: user ? true : false,
            user,
            token: prependTokenWithBearer(token),
          })),
        logout: () =>
          setState((prev) => ({
            ...prev,
            isAuthenticated: false,
            user: null,
            token: null,
          })),
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
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

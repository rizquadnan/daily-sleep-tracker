import { useAuth, useGuestMode } from 'providers'
import { Navigate, RouteProps } from 'react-router-dom'
import { ROUTES } from './constant'

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode
  redirectPath?: string
}

export const ProtectedRoute = ({
  children,
  redirectPath = ROUTES.splashScreen,
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const { isGuestMode } = useGuestMode()

  return isAuthenticated || isGuestMode ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectPath} replace />
  )
}

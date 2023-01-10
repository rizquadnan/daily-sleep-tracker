import { ReactNode } from 'react'
import { ColorModeToggle } from './ColorModeToggle'

type PageWrapperProps = {
  children: ReactNode
}
export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <ColorModeToggle />
      {children}
    </>
  )
}

import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { MotionConfigProvider } from '@/components/MotionConfigContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <MotionConfigProvider>
          {children}
        </MotionConfigProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}

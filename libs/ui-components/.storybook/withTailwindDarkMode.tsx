import { useEffect } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import type { Decorator } from '@storybook/react'

export const withTailwindDarkMode: Decorator = (Story) => {
  const isDark = useDarkMode()

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="bg-white dark:bg-gray-950 p-8">
      <Story />
    </div>
  )
}

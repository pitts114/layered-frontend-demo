/// <reference path="./global.d.ts" />

import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import { withTailwindDarkMode } from './withTailwindDarkMode'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Set the dark theme for Storybook UI
      dark: { ...themes.dark },
      light: { ...themes.normal },
    },
  },
  decorators: [withTailwindDarkMode],
}

export default preview

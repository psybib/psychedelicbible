import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const ThemeSwitch = () => {
  // State to track if the component has been mounted
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Set the mounted state to true after the component mounts
  useEffect(() => setMounted(true), [])

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded-full p-1 sm:ml-4"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-full w-full">
        {/* Dark theme background image */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: "url('/psychedelic-mushrooms.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: mounted && (theme === 'dark' || resolvedTheme === 'dark') ? 1 : 0,
          }}
          initial={false}
          animate={{ opacity: mounted && (theme === 'dark' || resolvedTheme === 'dark') ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Light theme background image */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: "url('/Eye_of_horus_blotter_art.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: mounted && (theme === 'dark' || resolvedTheme === 'dark') ? 0 : 1,
          }}
          initial={false}
          animate={{ opacity: mounted && (theme === 'dark' || resolvedTheme === 'dark') ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* SVG icon with rotation animation */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute inset-0 m-auto h-5 w-5 text-white"
          initial={{ rotate: 0 }}
          animate={{ rotate: mounted && (theme === 'dark' || resolvedTheme === 'dark') ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          {/* Conditional rendering based on theme */}
          {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          ) : (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          )}
        </motion.svg>
      </div>
    </motion.button>
  )
}

export default ThemeSwitch

/*
Enhanced ThemeSwitch Component

- Dependencies:
  - `useEffect` and `useState` from 'react' for managing state and side effects
  - `useTheme` from 'next-themes' for theme management
  - `motion` from 'framer-motion' for animations

- Features:
  - Toggles between dark and light themes
  - Animated button with scaling and rotation effects
  - WebP images as background changes based on the current theme
  - Smooth transition animations for theme change and button interactions

- Usage:
  <ThemeSwitch />

- Component Details:
  - `mounted`: State to track if the component is mounted
  - `useEffect`: Sets the `mounted` state to true after the component mounts
  - `toggleTheme`: Function to toggle between dark and light themes
  - `motion.button`: Animated button with scaling and rotation effects on hover and tap
  - `motion.div`: Background image animations for theme change using WebP images
  - `motion.svg`: Rotating SVG icon indicating the current theme
  - Conditional rendering of SVG path based on the current theme
*/

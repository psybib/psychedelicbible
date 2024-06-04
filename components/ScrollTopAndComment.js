import { motion } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'

const ScrollTopAndComment = () => {
  // State to control the visibility of the scroll buttons
  const [show, setShow] = useState(false)

  // Effect to handle window scroll event
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  // Scroll to the top of the page
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Scroll to the comment section
  const handleScrollToComment = () => {
    document.getElementById('comment').scrollIntoView({ behavior: 'smooth' })
  }

  // Animation variants for the motion components
  const variants = {
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  }

  return (
    <motion.div
      className={`fixed right-8 bottom-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
      initial="exit"
      animate={show ? 'enter' : 'exit'}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      {siteMetadata.comment.provider && (
        <motion.button
          aria-label="Scroll To Comment"
          type="button"
          onClick={handleScrollToComment}
          whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-2 text-white transition-all hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 dark:bg-gradient-to-r dark:from-pink-600 dark:via-red-600 dark:to-yellow-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      )}
      <motion.button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-2 text-white transition-all hover:from-purple-600 hover:via-blue-600 hover:to-green-600 dark:bg-gradient-to-r dark:from-purple-600 dark:via-blue-600 dark:to-green-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </motion.div>
  )
}

export default ScrollTopAndComment

/*
Enhanced ScrollTopAndComment Component

- Dependencies:
  - `motion` from 'framer-motion' for animations
  - `siteMetadata` from '@/data/siteMetadata' for site configuration
  - `useEffect` and `useState` from 'react' for managing state and side effects

- Features:
  - Shows scroll buttons when the user scrolls down the page
  - Scroll to top button
  - Scroll to comment section button
  - Psychedelic animations and gradient effects on buttons
  - Smooth scrolling for a better user experience

- Usage:
  <ScrollTopAndComment />

- Component Details:
  - `useState` to manage the visibility of the buttons
  - `useEffect` to handle scroll events and update visibility state
  - `handleScrollTop` function to scroll to the top of the page
  - `handleScrollToComment` function to scroll to the comment section
  - `variants` object for framer-motion animations
  - Conditional rendering based on the `show` state
  - Animations for hover and tap effects to enhance the user interface
*/

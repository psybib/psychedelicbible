import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import { motion } from 'framer-motion'

const Tag = ({ text }) => {
  // Return null if no text is provided to avoid rendering empty components
  if (!text) {
    return null
  }

  // Animation variants for the tag container
  const tagVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, 10, -10, 0], // Adding a rotation effect for a magical feel
      boxShadow: '0px 0px 12px rgba(138, 43, 226, 0.8)', // Adding a purply blue glow effect
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.9,
      rotate: 0, // Resetting rotation on tap
      boxShadow: '0px 0px 6px rgba(138, 43, 226, 0.6)', // Slightly reducing the glow
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  }

  // Animation variants for the text inside the tag
  const textVariants = {
    hover: {
      color: '#00FFFF', // Changing text color to cyan on hover for a magical effect
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }

  // Generate a URL-friendly slug from the tag text
  const tagSlug = kebabCase(text)

  return (
    <motion.div
      className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2" // Gradient background for a psychedelic effect
      variants={tagVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link href={`/tags/${tagSlug}`} passHref>
        <motion.span
          className="text-lg font-semibold text-white" // White text color for better contrast
          variants={textVariants}
        >
          {text}
        </motion.span>
      </Link>
    </motion.div>
  )
}

export default Tag

/*
Psychedelic Tag Component

- Dependencies:
  - `Link` from 'next/link' for navigation
  - `kebabCase` from '@/lib/utils/kebabCase' for generating URL-friendly slugs
  - `motion` from 'framer-motion' for animations

- Props:
  - `text`: The tag text to be displayed

- Features:
  - Conditional rendering to avoid rendering empty components
  - Animated tag container with scale, rotation, and purply blue glow effects for a magical feel
  - Animated text with color change to cyan on hover for a magical effect
  - Gradient background from purple to blue for a psychedelic appearance
  - Smooth transitions for hover and tap effects

- Usage:
  <Tag text="example" />

- Component Details:
  - `tagVariants`: Defines animation states for the tag container
    - `hover`: Scale up, add rotation and purply blue glow effect
    - `tap`: Scale down, reset rotation, slightly reduce glow
  - `textVariants`: Defines animation states for the tag text
    - `hover`: Change text color to cyan
  - `tagSlug`: Generate a URL-friendly slug from the tag text using `kebabCase`
  - Conditional rendering to return null if no `text` prop is provided
  - `motion.div` and `motion.span` to apply animations
  - `Link` for navigation to the tag page
*/

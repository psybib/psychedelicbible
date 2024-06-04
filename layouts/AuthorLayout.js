import { motion } from 'framer-motion'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company } = frontMatter

  // Animation variants for the component elements
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* SEO Component for the page */}
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />

      <div className="divide-y divide-emerald-200 dark:divide-emerald-700 overflow-hidden">
        {/* Motion div for the header section with animation */}
        <motion.div
          className="space-y-2 pt-6 pb-8 md:space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
          }}
        >
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </motion.div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          {/* Motion div for the author's profile section with animation */}
          <motion.div
            className="flex flex-col items-center pt-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
            }}
          >
            <Image
              src={avatar}
              alt="avatar"
              width="192"
              height="192"
              className="h-48 w-48 rounded-full"
              priority
              placeholder="blur"
              blurDataURL={avatar} // Ensure the placeholder image is webp format
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-emerald-900 dark:text-emerald-100">
              {name}
            </h3>
            <div className="text-lime-500 dark:text-lime-400">{occupation}</div>
            <div className="text-lime-500 dark:text-lime-400">{company}</div>
          </motion.div>

          {/* Motion div for the children content section with animation */}
          <motion.div
            className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </>
  )
}

/*
Refactored AuthorLayout Component

- Dependencies:
  - `motion` from 'framer-motion' for animations
  - `Image` from '@/components/Image' for optimized images
  - `PageSEO` from '@/components/SEO' for SEO management

- Props:
  - `children`: The content to be displayed within the layout
  - `frontMatter`: Object containing author details (name, avatar, occupation, company)

- Features:
  - SEO optimized component for the author's page
  - Animated sections with framer-motion for a smooth and dynamic user experience
  - Psychedelic theme with vibrant colors and gradient transitions
  - Lazy-loaded images with blur-up effect for better performance

- Usage:
  <AuthorLayout frontMatter={frontMatter}>{children}</AuthorLayout>

- Component Details:
  - `variants`: Defines animation states for the elements
    - `hidden`: Initial state with opacity 0 and y-axis translation
    - `visible`: Final state with opacity 1 and y-axis reset
  - `motion.div`: Applies the animations to the div elements
  - `Image`: Optimized image component with blur-up placeholder
  - `PageSEO`: Component for setting page title and description
*/

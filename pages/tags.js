import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import { motion } from 'framer-motion'

export async function getStaticProps() {
  let tags = {}
  try {
    tags = await getAllTags('blog')
  } catch (error) {
    console.error('Error in getStaticProps for tags:', error)
  }
  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  }

  const tagVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.title}`} description={siteMetadata.description} />
      <motion.div
        className="flex overflow-x-hidden overflow-y-hidden flex-col items-start justify-start divide-y divide-emerald-200 dark:divide-emerald-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0"
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <motion.div
          className="flex max-w-lg flex-wrap"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            const tagSlug = kebabCase(t)
            return (
              <motion.div
                key={tagSlug}
                className="m-2"
                variants={tagVariants}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(74, 222, 128, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/tags/${tagSlug}`}>
                  <Tag text={t} />
                  <span className="ml-2 text-sm font-medium uppercase text-emerald-600 dark:text-emerald-300">
                    {tags[t]}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </>
  )
}
import { motion } from 'framer-motion'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

/**
 * ListLayout component
 * Renders a list of blog posts with search functionality and pagination
 *
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of blog post objects
 * @param {string} props.title - Title of the list
 * @param {Array} [props.initialDisplayPosts=[]] - Array of initially displayed posts
 * @param {Object} [props.pagination=null] - Pagination object
 * @returns {JSX.Element} - Rendered component
 */
export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')

  /**
   * Filter blog posts based on search value
   * @type {Array}
   */
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  /**
   * Determine the posts to display based on search value and initial display posts
   * @type {Array}
   */
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-emerald-200 dark:divide-emerald-700 overflow-x-hidden overflow-y-hidden rounded-lg">
        {/* Header */}
        <motion.div
          className="space-y-2 pt-6 pb-8 md:space-y-5"
          initial={{ opacity: 0, y: 20, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 rounded-lg">
            {title}
          </h1>
          {/* Search input */}
          <motion.div
            className="relative max-w-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-emerald-300 bg-white px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-emerald-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-emerald-400 dark:text-emerald-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>
        </motion.div>
        {/* Blog post list */}
        <motion.ul
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <motion.li
                key={slug}
                className="py-4"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.02,
                  translateY: -5,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                  outline: '2px solid rgba(74, 222, 128, 0.5)', // Light outline on hover
                  backgroundColor: 'rgba(74, 222, 128, 0.1)', // Slight background color on hover
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 p-4 rounded-lg">
                  {' '}
                  {/* Added padding and rounded corners */}
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-lime-500 dark:text-lime-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-emerald-900 dark:text-emerald-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 rounded-lg" // Added hover effect and smooth color transition
                        >
                          {title}
                        </Link>
                      </h3>
                      {/* Tag list */}
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <div key={tag} className="p-1 mr-3 mb-3">
                            <Tag text={tag} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-emerald-900 dark:text-emerald-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 rounded-lg" // Added hover effect and smooth color transition
                      >
                        {summary}
                      </Link>
                    </div>
                  </div>
                </article>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}

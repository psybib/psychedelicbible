import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import { motion } from 'framer-motion'
import { useState } from 'react'
import useSound from 'use-sound'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

export default function Home({ posts }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  }

  const postVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8, rotate: -5 },
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

  const [isPlaying, setIsPlaying] = useState(false)
  const [play, { stop }] = useSound('/kalilsd.mp3')

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-emerald-200 dark:divide-emerald-700">
        <motion.div
          className="space-y-2 pt-6 pb-8 md:space-y-5 overflow-x-hidden overflow-y-hidden"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-lime-500 dark:text-lime-400">
            {siteMetadata.description}
          </p>
        </motion.div>
        <motion.ul
          className="divide-y divide-emerald-200 dark:divide-emerald-700"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <motion.li
                key={slug}
                className="py-12"
                variants={postVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(74, 222, 128, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-lime-500 dark:text-lime-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-emerald-900 dark:text-emerald-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags &&
                              Array.isArray(tags) &&
                              tags.map((tag) => (
                                <div key={tag} className="p-1 mr-3 mb-3">
                                  <Tag text={tag} />
                                </div>
                              ))}
                          </div>
                        </div>
                        <Link
                          href={`/blog/${slug}`}
                          className="text-emerald-900 dark:text-emerald-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                        >
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </Link>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <motion.div
          className="flex justify-end text-base font-medium leading-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </motion.div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <motion.div
          className="flex items-center justify-center pt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
        >
          {/* Newsletter sign-up form or call-to-action can be placed here */}
        </motion.div>
      )}
      <motion.button
        className="fixed bottom-4 right-4 p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (isPlaying) {
            stop()
          } else {
            play()
          }
          setIsPlaying(!isPlaying)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          {isPlaying ? (
            <path
              fillRule="evenodd"
              d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9zm7.5 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9.75z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M6.75 5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25H9a2.25 2.25 0 01-2.25-2.25V5.25zm6 0v12a.75.75 0 001.5 0V5.25a.75.75 0 00-1.5 0z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </motion.button>
    </>
  )
}
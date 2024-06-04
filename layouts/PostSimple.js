import { motion } from 'framer-motion'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

/**
 * PostLayout component
 * Renders the layout for a blog post
 *
 * @param {Object} props - Component props
 * @param {Object} props.frontMatter - Frontmatter data of the blog post
 * @param {Object} props.authorDetails - Details of the post author
 * @param {Object} props.next - Next post object
 * @param {Object} props.prev - Previous post object
 * @param {ReactNode} props.children - Content of the blog post
 * @returns {JSX.Element} - Rendered component
 */
export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title } = frontMatter

  /**
   * Animation variants for the magical theme
   * @type {Object}
   */
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9, rotate: -2 },
    visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  }

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            {/* Animated header */}
            <motion.div
              className="space-y-1 border-b border-emerald-200 pb-10 text-center dark:border-emerald-700 overflow-x-hidden overflow-y-hidden"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-lime-500 dark:text-lime-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </motion.div>
          </header>
          <div
            className="divide-y divide-emerald-200 pb-8 dark:divide-emerald-700 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            {/* Animated content */}
            <motion.div
              className="divide-y divide-emerald-200 dark:divide-emerald-700 xl:col-span-3 xl:row-span-2 xl:pb-0"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </motion.div>
            <Comments frontMatter={frontMatter} />
            <footer>
              {/* Animated footer */}
              <motion.div
                className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ease-in-out transform hover:-translate-x-1 hover:scale-105"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ease-in-out transform hover:translate-x-1 hover:scale-105"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </motion.div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

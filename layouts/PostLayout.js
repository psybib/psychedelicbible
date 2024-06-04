import { motion } from 'framer-motion'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

/**
 * PostLayout component
 * Renders the layout for a blog post
 *
 * @param {Object} props - Component props
 * @param {Object} props.frontMatter - Frontmatter data of the blog post
 * @param {Array} props.authorDetails - Details of the post author
 * @param {Object} [props.next] - Next post object
 * @param {Object} [props.prev] - Previous post object
 * @param {ReactNode} props.children - Content of the blog post
 * @returns {JSX.Element} - Rendered PostLayout component
 */
export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags } = frontMatter

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <motion.div
          className="xl:divide-y xl:divide-emerald-200 xl:dark:divide-emerald-700 overflow-x-hidden overflow-y-hidden"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-lime-500 dark:text-lime-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-emerald-200 pb-8 dark:divide-emerald-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:border-b xl:border-emerald-200 xl:pt-11 xl:dark:border-emerald-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38"
                          height="38"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-emerald-900 dark:text-emerald-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-emerald-200 dark:divide-emerald-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <motion.div
                className="prose max-w-none pt-10 pb-8 dark:prose-dark"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
              <motion.div
                className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              ></motion.div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <motion.div
                className="divide-emerald-200 text-sm font-medium leading-5 dark:divide-emerald-700 xl:col-start-1 xl:row-start-2 xl:divide-y"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-lime-500 dark:text-lime-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-lime-500 dark:text-lime-400">
                          Previous Article
                        </h2>
                        <div className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-lime-500 dark:text-lime-400">
                          Next Article
                        </h2>
                        <div className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
              <motion.div
                className="pt-4 xl:pt-8"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
              >
                <Link
                  href="/blog"
                  className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  &larr; Back to the blog
                </Link>
              </motion.div>
            </footer>
          </div>
        </motion.div>
      </article>
    </SectionContainer>
  )
}

import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { motion } from 'framer-motion'

const DEFAULT_LAYOUT = 'PostLayout'

/**
 * Get static paths for blog posts
 *
 * @returns {Object} - Static paths configuration
 */
export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

/**
 * Get static props for a blog post
 *
 * @param {Object} context - Static props context
 * @param {Object} context.params - URL parameters
 * @param {string[]} context.params.slug - Slug of the blog post
 * @returns {Object} - Static props
 */
export async function getStaticProps({ params }) {
  try {
    const allPosts = await getAllFilesFrontMatter('blog')
    const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
    const prev = allPosts[postIndex + 1] || null
    const next = allPosts[postIndex - 1] || null
    const post = await getFileBySlug('blog', params.slug.join('/'))
    const authorList = post.frontMatter.authors || ['default']
    const authorPromise = authorList.map(async (author) => {
      const authorResults = await getFileBySlug('authors', [author])
      return authorResults.frontMatter
    })
    const authorDetails = await Promise.all(authorPromise)

    // Generate RSS feed
    if (allPosts.length > 0) {
      const rss = generateRss(allPosts)
      fs.writeFileSync('./public/feed.xml', rss)
    }

    return { props: { post, authorDetails, prev, next } }
  } catch (error) {
    console.error(`Error in getStaticProps for slug ${params.slug.join('/')}:`, error)
    return { notFound: true }
  }
}

/**
 * Blog post component
 *
 * @param {Object} props - Component props
 * @param {Object} props.post - Blog post data
 * @param {Object[]} props.authorDetails - Author details
 * @param {Object} props.prev - Previous blog post
 * @param {Object} props.next - Next blog post
 * @returns {JSX.Element} - Rendered blog post component
 */
export default function Blog({ post, authorDetails, prev, next }) {
  if (!post) {
    return <div>Post not found</div>
  }

  const { mdxSource, toc, frontMatter } = post

  /**
   * Animation variants for the magical theme
   */
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  /**
   * Magical sparkle effect animation
   */
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  /**
   * Individual sparkle animation
   */
  const sparkleItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <>
      {frontMatter.draft !== true ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="overflow-x-hidden overflow-y-hidden"
        >
          {/* Magical sparkle effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            
            initial="hidden"
            animate="visible"
          >
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-75"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                
              />
            ))}
          </motion.div>
          <MDXLayoutRenderer
            layout={frontMatter.layout || DEFAULT_LAYOUT}
            toc={toc}
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            authorDetails={authorDetails}
            prev={prev}
            next={next}
          />
        </motion.div>
      ) : (
        <motion.div
          className="mt-24 text-center"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </motion.div>
      )}
    </>
  )
}
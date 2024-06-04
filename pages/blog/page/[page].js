import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { motion } from 'framer-motion'

/**
 * Generate static paths for pagination
 *
 * @returns {Object} - Static paths configuration
 */
export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

/**
 * Get static props for the post page
 *
 * @param {Object} context - Static props context
 * @returns {Object} - Static props
 */
export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

/**
 * PostPage component
 *
 * @param {Object} props - Component props
 * @param {Array} props.posts - All blog posts
 * @param {Array} props.initialDisplayPosts - Initially displayed blog posts
 * @param {Object} props.pagination - Pagination configuration
 * @returns {JSX.Element} - Rendered PostPage component
 */
export default function PostPage({ posts, initialDisplayPosts, pagination }) {
  /**
   * Animation variants for the magical theme
   */
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="overflow-x-hidden overflow-y-hidden"
      >
      
        {/* Blog post list */}
        <ListLayout
          posts={posts}
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
          title="All Posts"
        />
      </motion.div>
    </>
  )
}
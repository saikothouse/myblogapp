import Share from "@components/Share";
import dateFormat from "@lib/utils/dateFormat";
import similerItems from "@lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import SimilarPosts from "@partials/SimilarPosts";
import Image from "next/image";
import Link from "next/link";
import MDXContent from "./partials/MDXContent";
import { 
  IoPersonOutline, 
  IoCalendarOutline, 
  IoFolderOutline, 
  IoPricetagsOutline 
} from "react-icons/io5";
import dynamic from 'next/dynamic';

// Dynamically import Disqus component
const DiscussionEmbed = dynamic(
  () => import('disqus-react').then((mod) => mod.DiscussionEmbed),
  { ssr: false }
);

const PostSingle = ({ post, posts, authors, slug }) => {
  const { frontmatter, content } = post;
  let { 
    description, 
    title, 
    date, 
    image, 
    categories, 
    tags,
    disqus_shortname = 'sobkiso', // Add this to your frontmatter
  } = frontmatter;
  
  description = description ? description : content.slice(0, 120);
  const similarPosts = similerItems(post, posts, slug);

  // Disqus configuration
  const disqusConfig = {
    url: typeof window !== 'undefined' ? window.location.href : '',
    identifier: slug,
    title: title,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose lg:prose-xl max-w-none">
        {/* Title */}
        <div className="text-center mb-10">
          {markdownify(title, "h1", "text-3xl md:text-4xl font-bold text-gray-900 mb-6")}
          
          {/* Metadata */}
          <div className="flex flex-wrap justify-center items-center space-x-4 text-gray-600 text-sm">
            {/* Authors */}
            <div className="flex items-center space-x-2">
              <IoPersonOutline className="text-primary" />
              {authors
                .filter((author) =>
                  frontmatter.authors
                    .map((author) => slugify(author))
                    .includes(slugify(author.frontmatter.title))
                )
                .map((author, i) => (
                  <Link
                    key={`author-${i}`}
                    href={`/authors/${slugify(author.frontmatter.title)}`}
                    className="flex items-center hover:text-primary"
                  >
                    {author.frontmatter.image && (
                      <Image
                        src={author.frontmatter.image}
                        alt={author.frontmatter.title}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                    )}
                    <span>{author.frontmatter.title}</span>
                  </Link>
                ))}
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2">
              <IoCalendarOutline className="text-primary" />
              <span>{dateFormat(date)}</span>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-2">
              <IoFolderOutline className="text-primary" />
              {categories.map((category, i) => (
                <Link
                  key={`category-${i}`}
                  href={`/categories/${slugify(category)}`}
                  className="hover:text-primary"
                >
                  {humanize(category)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {image && (
          <div className="mb-10 relative w-full aspect-video">
            <Image
              src={image}
              alt={title}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose lg:prose-xl max-w-none">
          <MDXContent content={content} />
        </div>

        {/* Tags and Share */}
        <div className="mt-10 flex flex-wrap justify-between items-center border-t pt-6">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <IoPricetagsOutline className="text-primary mr-2" />
            {tags.map((tag, i) => (
              <Link
                key={`tag-${i}`}
                href={`/tags/${slugify(tag)}`}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition"
              >
                #{humanize(tag)}
              </Link>
            ))}
          </div>

          {/* Share */}
          <div className="mt-4 sm:mt-0">
            <Share
              title={title}
              description={description}
              slug={slug}
            />
          </div>
        </div>

        {/* Disqus Comments */}
        {disqus_shortname && (
          <div className="mt-12 pt-10 border-t">
            <h3 className="text-2xl font-bold mb-6">Comments</h3>
            <DiscussionEmbed
              shortname={disqus_shortname}
              config={disqusConfig}
            />
          </div>
        )}
      </article>

      {/* Similar Posts */}
      {similarPosts && similarPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Similar Posts</h2>
          <SimilarPosts posts={similarPosts.slice(0, 3)} />
        </section>
      )}
    </div>
  );
};

export default PostSingle;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";

// Icons
import { 
  IoPersonOutline, 
  IoCalendarOutline, 
  IoFolderOutline, 
  IoPricetagsOutline 
} from "react-icons/io5";

// Components
import Share from "@components/Share";
import SimilarPosts from "@partials/SimilarPosts";
import MDXContent from "./partials/MDXContent";

// Utilities
import dateFormat from "@lib/utils/dateFormat";
import similerItems from "@lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";

// Dynamic imports
const DiscussionEmbed = dynamic(
  () => import('disqus-react').then((mod) => mod.DiscussionEmbed),
  { ssr: false }
);

// Utility for image placeholder
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) => 
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Author Link Component
const AuthorLink = ({ author }) => (
  <Link
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
);

const PostSingle = ({ post, posts, authors, slug }) => {
  // Defensive programming with default values
  const { 
    frontmatter = {}, 
    content = '' 
  } = post || {};

  const {
    description = '', 
    title = 'Untitled', 
    date = new Date(), 
    image = '', 
    categories = [], 
    tags = [],
    disqus_shortname = null,
    authors: postAuthors = []
  } = frontmatter;

  // Null check
  if (!post) {
    return <div className="text-center text-xl py-20">No post found</div>;
  }

  // Memoized computations
  const processedDescription = useMemo(() => 
    description || content.slice(0, 120), 
    [description, content]
  );

  const similarPosts = useMemo(() => 
    similerItems(post, posts, slug).slice(0, 3), 
    [post, posts, slug]
  );

  const filteredAuthors = useMemo(() => 
    authors.filter((author) =>
      postAuthors
        .map((a) => slugify(a))
        .includes(slugify(author.frontmatter.title))
    ),
    [authors, postAuthors]
  );

  // Disqus configuration
  const disqusConfig = useMemo(() => {
    if (typeof window === 'undefined') return {};
    
    return {
      url: window.location.href,
      identifier: slug || 'default-identifier',
      title: title || 'Blog Post',
    };
  }, [slug, title]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article 
        className="prose lg:prose-xl max-w-none"
        itemScope 
        itemType="http://schema.org/BlogPosting"
      >
        {/* Title */}
        <div className="text-center mb-10">
          {markdownify(title, "h1", "text-3xl md:text-4xl font-bold text-gray-900 mb-6")}
          
          {/* Metadata */}
          <div className="flex flex-wrap justify-center items-center space-x-4 text-gray-600 text-sm">
            {/* Authors */}
            {filteredAuthors.length > 0 && (
              <div className="flex items-center space-x-2">
                <IoPersonOutline className="text-primary" />
                {filteredAuthors.map((author, i) => (
                  <AuthorLink key={`author-${i}`} author={author} />
                ))}
              </div>
            )}

            {/* Date */}
            <div className="flex items-center space-x-2">
              <IoCalendarOutline className="text-primary" />
              <span>{dateFormat(date)}</span>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
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
            )}
          </div>
        </div>

        {/* Featured Image */}
        {image && (
          <div className="mb-10 relative w-full aspect-video">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg object-cover"
              priority
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
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
          {tags.length > 0 && (
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
          )}

          {/* Share */}
          <div className="mt-4 sm:mt-0">
            <Share
              title={ title}
              description={processedDescription}
              slug={slug}
            />
          </div>
        </div>

        {/* Disqus Comments */}
        {process.env.NODE_ENV === 'production' && disqus_shortname && (
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
          <SimilarPosts posts={similarPosts} />
        </section>
      )}
    </div>
  );
};

// PropTypes for type checking
PostSingle.propTypes = {
  post: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
};

export default PostSingle;

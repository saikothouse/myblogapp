import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { 
  IoBookmarkOutline, 
  IoTimeOutline, 
  IoPricetagOutline,
  IoPersonOutline 
} from "react-icons/io5";

const Posts = ({ posts, className, authors }) => {
  const { summary_length } = config.settings;

  return (
    <div 
      className={`
        grid grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6 
        ${className}
      `}
    >
      {posts.map((post, index) => (
        <div 
          key={`key-${index}`} 
          className="
            bg-white 
            dark:bg-gray-800 
            rounded-lg 
            shadow-md 
            hover:shadow-xl 
            transition-shadow 
            duration-300 
            transform 
            hover:-translate-y-1 
            overflow-hidden
            border 
            border-gray-200 
            dark:border-gray-700
          "
        >
          {/* Post Image */}
          {post.frontmatter.image && (
            <div className="relative h-48 md:h-56 w-full overflow-hidden">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="
                  object-cover 
                  transition-transform 
                  duration-300 
                  group-hover:scale-110
                "
                priority={index === 0}
              />
            </div>
          )}

          {/* Post Content */}
          <div className="p-5">
            {/* Metadata */}
            <div className="flex flex-wrap items-center space-x-4 mb-4 text-gray-600 dark:text-gray-300">
              {/* Author */}
              <div className="flex items-center space-x-2">
                <IoPersonOutline className="text-primary" />
                {authors
                  .filter((author) =>
                    post.frontmatter.authors
                      .map((a) => slugify(a))
                      .includes(slugify(author.frontmatter.title))
                  )
                  .map((author, i) => (
                    <Link
                      key={`author-${i}`}
                      href={`/authors/${slugify(author.frontmatter.title)}`}
                      className="
                        hover:text-primary 
                        transition-colors 
                        text-sm
                      "
                    >
                      {author.frontmatter.title}
                    </Link>
                  ))}
              </div>

              {/* Date */}
              <div className="flex items-center space-x-2">
                <IoTimeOutline className="text-primary" />
                <span className="text-sm">
                  {dateFormat(post.frontmatter.date)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="
              text-xl 
              font-bold 
              mb-2 
              dark:text-white 
              hover:text-primary 
              transition-colors
            ">
              <Link href={`/${post.slug}`}>
                {post.frontmatter.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="
              text-gray-600 
              dark:text-gray-400 
              mb-4 
              line-clamp-3
            ">
              {post.content && post.content.slice(0, Number(summary_length))}...
            </p>

            {/* Categories and Read More */}
            <div className="flex justify-between items-center">
              {/* Categories */}
              <div className="flex items-center space-x-2">
                <IoPricetagOutline className="text-primary" />
                <div className="flex space-x-2">
                  {post.frontmatter.categories.slice(0, 2).map((category, i) => (
                    <Link
                      key={`category-${i}`}
                      href={`/categories/${slugify(category)}`}
                      className="
                        text-xs 
                        bg-gray-200 
                        dark:bg-gray-700 
                        px-2 
                        py-1 
                        rounded-full 
                        hover:bg-primary 
                        hover:text-white 
                        transition-colors
                      "
                    >
                      {humanize(category)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Read More */}
              <Link
                href={`/${post.slug}`}
                className="
                  flex 
                  items-center 
                  space-x-2 
                  text-primary 
                  hover:underline 
                  transition-all
                "
              >
                <IoBookmarkOutline />
                <span className="text-sm">Read More</span>
              </Link>
            </div>
          </div>
        </ div>
      ))}
    </div>
  );
};

export default Posts;

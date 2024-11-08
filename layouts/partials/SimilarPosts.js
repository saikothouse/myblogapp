import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { IoCalendarOutline, IoFolderOutline } from "react-icons/io5";

const SimilarPosts = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <div 
          key={`key-${i}`} 
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group"
        >
          {post.frontmatter.image && (
            <div className="relative pt-[52%] overflow-hidden">
              <Image
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center text-sm text-gray-600 mb-2 space-x-3">
              <div className="flex items-center space-x-1">
                <IoCalendarOutline className="text-primary" />
                <span>{dateFormat(post.frontmatter.date)}</span>
              </div>
              
              {post.frontmatter.categories && (
                <div className="flex items-center space-x-1">
                  <IoFolderOutline className="text-primary" />
                  <div>
                    {post.frontmatter.categories.map((category, i) => (
                      <Link
                        key={`category-${i}`}
                        href={`/categories/${slugify(category)}`}
                        className="hover:text-primary mr-2 last:mr-0"
                      >
                        {humanize(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">
              <Link 
                href={`/${post.slug}`} 
                className="text-dark hover:text-primary transition-colors duration-300 line-clamp-2"
              >
                {post.frontmatter.title}
              </Link>
            </h3>
            
            <Link
              href={`/${post.slug}`}
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-300 group"
            >
              Read More
              <svg 
                className="ml-2 transition-transform group-hover:translate-x-1" 
                width="15" 
                height="15" 
                viewBox="0 0 15 15" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" 
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarPosts;

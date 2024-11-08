import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "./partials/MDXContent";
import { 
  IoDocumentTextOutline, 
  IoBookOutline 
} from "react-icons/io5";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;

  return (
    <section className="section bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article 
          className="
            bg-white 
            dark:bg-gray-800 
            shadow-xl 
            rounded-2xl 
            overflow-hidden 
            border 
            border-gray-200 
            dark:border-gray-700
          "
        >
          {/* Header */}
          <header 
            className="
              bg-gradient-to-r 
              from-primary/10 
              to-primary/20 
              dark:from-primary/20 
              dark:to-primary/30 
              px-6 
              py-8 
              text-center
            "
          >
            <div className="flex justify-center items-center space-x-4 mb-4">
              <IoDocumentTextOutline 
                className="
                  text-primary 
                  text-4xl 
                  opacity-70
                " 
              />
              <IoBookOutline 
                className="
                  text-primary 
                  text-4xl 
                  opacity-70
                " 
              />
            </div>
            {markdownify(
              title, 
              "h1", 
              "text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
            )}
          </header>

          {/* Content */}
          <div 
            className="
              prose 
              prose-lg 
              dark:prose-invert 
              max-w-none 
              p-6 
              sm:p-8 
              md:p-12
            "
          >
            <MDXContent content={content} />
          </div>
        </article>

        {/* Additional Context Section */}
        <div 
          className="
            mt-10 
            bg-white 
            dark:bg-gray-800 
            shadow-lg 
            rounded-2xl 
            p-6 
            border 
            border-gray-200 
            dark:border-gray-700
          "
        >
          <div 
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              justify-between 
              space-y-4 
              md:space-y-0 
              md:space-x-6
            "
          >
            <div 
              className="
                flex-shrink-0 
                bg-primary/10 
                dark:bg-primary/20 
                p-4 
                rounded-full
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="
                  w-10 
                  h-10 
                  text-primary
                "
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" 
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 
                className="
                  text-xl 
                  font-semibold 
                  text-gray-800 
                  dark:text-white 
                  mb-2
                "
              >
                Additional Context
              </h3>
              <p 
                className="
                  text-gray-600 
                  dark:text-gray-300
                "
              >
                This page provides additional information about the topic. 
                If you need more details or have questions, feel free to 
                reach out to us.
              </p>
            </div>
            <div>
              <button 
                className="
                  bg-primary 
                  text-white 
                  px-6 
                  py-3 
                  rounded-lg 
                  hover:bg-primary-dark 
                  transition-colors 
                  duration-300
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Default;

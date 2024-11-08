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
      </div>
    </section>
  );
};

export default Default;

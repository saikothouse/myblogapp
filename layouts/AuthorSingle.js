import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Social from "./components/Social";
import MDXContent from "./partials/MDXContent";
import SeoMeta from "./partials/SeoMeta";

const AuthorSingle = ({ frontmatter, content }) => {
  const { description, social, title, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        description={description ? description : content.slice(0, 120)}
      />
      <section className="section bg-gray-50">
        <div className="container mx-auto p-6 md:p-12">
          <div className="mb-4 text-center">
            {image && (
              <div className="mb-8">
                <Image
                  src={image}
                  className="mx-auto rounded-full shadow-lg"
                  height={150}
                  width={150}
                  alt={title}
                />
              </div>
            )}
            {markdownify(title, "h1", "text-3xl font-bold mb-4")}
            <p className="text-gray-600 mb-6">{description}</p>
            <Social source={social} className="social-icons-simple mb-6" />
            <div className="content bg-white p-6 rounded-lg shadow-md">
              <MDXContent content={content} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorSingle;

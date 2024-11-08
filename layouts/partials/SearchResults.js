"use client";

import { slugify } from "@lib/utils/textConverter";
import { useSearchContext } from "context/state";
import { useSearchParams } from "next/navigation";
import Posts from "./Posts";
import SeoMeta from "./SeoMeta";

const SearchResults = ({ authors }) => {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const keyword = slugify(key || "");
  const { posts } = useSearchContext();

  const searchResults = posts.filter((product) => {
    if (product.frontmatter.draft) {
      return !product.frontmatter.draft;
    }
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (
      product.frontmatter.categories.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      return product;
    } else if (
      product.frontmatter.tags.find((tag) => slugify(tag).includes(keyword))
    ) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });

  return (
    <>
      <SeoMeta title={`Search results for ${key}`} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for{" "}
          <span className="text-primary font-semibold">{key}</span>
        </h1>
        {searchResults.length > 0 ? (
          <Posts posts={searchResults} authors={authors} />
        ) : (
          <div className="py-24 text-center text-xl text-gray-600">
            <p>No Search Found</p>
            <p className="mt-4 text-gray-500">
              Try different keywords or check your spelling.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;

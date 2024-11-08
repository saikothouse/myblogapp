import Link from "next/link";
import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  // Determine which page numbers to show
  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageList;
    }

    const pages = [];
    if (currentPage <= 3) {
      pages.push(...[1, 2, 3, 4, 'ellipsis', totalPages]);
    } else if (currentPage >= totalPages - 2) {
      pages.push(...[1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
    } else {
      pages.push(...[
        1, 
        'ellipsis', 
        currentPage - 1, 
        currentPage, 
        currentPage + 1, 
        'ellipsis', 
        totalPages
      ]);
    }

    return [...new Set(pages)];
  };

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 flex flex-wrap justify-center items-center space-x-2 sm:space-x-4"
          aria-label="Pagination"
        >
          {/* Previous Page */}
          {hasPrevPage ? (
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="group pagination-btn"
              aria-label="Previous page"
            >
              <IoChevronBackOutline className="transition-transform group-hover:-translate-x-1" />
            </Link>
          ) : (
            <span 
              className="pagination-btn cursor-not-allowed opacity-50"
              aria-disabled="true"
            >
              <IoChevronBackOutline />
            </span>
          )}

          {/* Page Numbers */}
          {renderPageNumbers().map((pagination, i) => {
            if (pagination === 'ellipsis') {
              return (
                <span 
                  key={`ellipsis-${i}`} 
                  className="px-2 py-1 text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <Link
                key={`page-${pagination}`}
                href={
                  pagination === 1
                    ? `${section ? "/" + section : "/"}`
                    : `${section ? "/" + section : ""}/page/${pagination}`
                }
                className={`pagination-btn ${
                  pagination === currentPage 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-primary/10 text-dark'
                }`}
                aria-current={pagination === currentPage ? 'page' : undefined}
              >
                {pagination}
              </Link>
            );
          })}

          {/* Next Page */}
          {hasNextPage ? (
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="group pagination-btn"
              aria-label="Next page"
            >
              <IoChevronForwardOutline className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <span 
              className="pagination-btn cursor-not-allowed opacity-50"
              aria-disabled="true"
            >
              <IoChevronForwardOutline />
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;

// Add these Tailwind classes to your global CSS or create a separate CSS file
// You can customize these further to match your design
const styles = `
  .pagination-btn {
    @apply 
    flex 
    items-center 
    justify-center 
    w-10 
    h-10 
    rounded-lg 
    border 
    border-primary 
    transition-all 
    duration-300 
    ease-in-out 
    focus:outline-none 
    focus:ring-2 
    focus:ring-primary/50
  }
`;

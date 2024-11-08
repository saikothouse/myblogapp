"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { 
  IoCloseCircleOutline, 
  IoSearchOutline, 
  IoCloseOutline 
} from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

const SearchModal = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (searchModal) {
      inputRef.current?.focus();
    }
  }, [searchModal]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (searchModal) {
        if (e.key === "Enter" && input.trim()) {
          router.push(`/search?key=${encodeURIComponent(input)}`);
          setSearchModal(false);
        }
        if (e.key === "Escape") {
          setSearchModal(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchModal, input, router, setSearchModal]);

  // Search handler
  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/search?key=${encodeURIComponent(input)}`);
      setSearchModal(false);
    }
  };

  // Clear input
  const handleClear = () => {
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {searchModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed 
            inset-0 
            z-50 
            bg-black/50 
            backdrop-blur-sm 
            flex 
            items-center 
            justify-center 
            p-4
          "
          onClick={() => setSearchModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
              w-full 
              max-w-2xl 
              bg-white 
              dark:bg-gray-800 
              rounded-xl 
              shadow-2xl 
              overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Container */}
            <div className="
              flex 
              items-center 
              border-b 
              dark:border-gray-700 
              px-4 
              py-3
            ">
              <IoSearchOutline 
                className="
                  text-2xl 
                  text-gray-500 
                  dark:text-gray-400 
                  mr-3
                " 
              />
              
              <input
                ref={inputRef}
                type="text"
                value={input}
                className="
                  w-full 
                  bg-transparent 
                  outline-none 
                  text-lg 
                  text-gray-800 
                  dark:text-white 
                  placeholder-gray-500 
                  dark:placeholder-gray-400
                "
                placeholder="Search articles, tags, categories..."
                onChange={(e) => setInput(e.target.value)}
              />

              {/* Clear Input */}
              {input && (
                <button 
                  onClick={handleClear}
                  className="
                    text-gray-500 
                    dark:text-gray-400 
                    hover:text-primary 
                    transition-colors
                  "
                >
                  <IoCloseOutline className="text-2xl" />
                </button>
              )}

              {/* Close Modal Button */}
              <button 
                onClick={() => setSearchModal(false)}
                className="
                  ml-3 
                  text-gray-500 
                  dark:text-gray-400 
                  hover:text-primary 
                  transition-colors
                "
              >
                <IoCloseCircleOutline className="text-2xl" />
              </button>
            </div>

            {/* Recent Searches or Quick Links */}
            {!input && (
              <div className="p-4">
                <h4 className="
                  text-sm 
                  font-semibold 
                  text-gray-600 
                  dark:text-gray-300 
                  mb-3
                ">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "React",
                    "Web Development",
                    "JavaScript",
                    "Design Trends"
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setInput(tag);
                        handleSearch();
                      }}
                      className="
                        px-3 
                        py-1 
                        bg-gray-100 
                        dark:bg-gray-700 
                        text-sm 
                        rounded-full 
                        hover:bg-primary 
                        hover:text-white 
                        transition-colors
                      "
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            {input && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900 text-right">
                <button
                  onClick={handleSearch}
                  disabled={!input.trim()}
                  className="
                    bg-primary 
                    text-white 
                    px-6 
                    py-2 
                    rounded-lg 
                    hover:bg-primary-dark 
                    transition-colors 
                    disabled:opacity-50 
                    disabled:cursor-not-allowed
                  "
                >
                  Search
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

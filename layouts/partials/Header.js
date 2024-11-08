"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import SearchModal from "@layouts/partials/SearchModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
  IoSearch, 
  IoMenu, 
  IoClose, 
  IoMoon, 
  IoSunny, 
  IoChevronDown,
  IoGlobeOutline 
} from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { main } = menu;

  const [navFixed, setNavFixed] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Change navbar background on scroll
  useEffect(() => {
    const changeNavbarBackground = () => {
      setNavFixed(window.pageYOffset >= 1);
    };
    
    window.addEventListener("scroll", changeNavbarBackground);
    return () => window.removeEventListener("scroll", changeNavbarBackground);
  }, []);

  // Dropdown toggle handler
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 
          bg-white dark:bg-gray-900 
          transition-all duration-300
          shadow-md
          ${navFixed ? "py-2" : "py-4 md:py-6"}
          h-16 md:h-20 // Set a fixed height for the header
        `}
      >
        <nav className="navbar container mx-auto px-4 flex items-center justify-between relative">
          {/* Logo and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Logo />
            {/* Theme Toggle with Tooltip */}
            <div className="group relative">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="
                  p-2 rounded-full 
                  bg-gray-100 dark:bg-gray-700
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  transition-colors
                  group-hover:scale-110
                "
                aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Io Sunny className="text-yellow-500" /> : <IoMoon className="text-indigo-500" />}
              </button>
              <span className="
                absolute -bottom-8 left-1/2 -translate-x-1/2
                bg-gray-800 text-white text-xs 
                px-2 py-1 rounded 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              ">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul
            className="
              hidden md:flex 
              space-x-6 
              items-center 
              dark:text-gray-200
            "
          >
            {main.map((menuItem, index) => (
              <li 
                key={`menu-${index}`} 
                className="relative group"
              >
                {menuItem.hasChildren ? (
                  <div 
                    className="
                      flex items-center 
                      cursor-pointer 
                      hover:text-primary 
                      transition-colors
                      py-2
                    "
                    onClick={() => toggleDropdown(index)}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === index}
                  >
                    {menuItem.name}
                    <IoChevronDown 
                      className={`
                        ml-1 transition-transform 
                        ${activeDropdown === index ? 'rotate-180' : ''}
                      `} 
                    />
                  </div>
                ) : (
                  <Link 
                    href={menuItem.url} 
                    className="
                      hover:text-primary 
                      transition-colors
                      py-2
                      group
                    "
                  >
                    {menuItem.name}
                    <span className="
                      block h-0.5 bg-primary 
                      scale-x-0 group-hover:scale-x-100 
                      transition-transform origin-left
                    "></span>
                  </Link>
                )}

                {menuItem.hasChildren && activeDropdown === index && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="
                      absolute top-full left-0 
                      bg-white dark:bg-gray-800 
                      shadow-lg rounded-md 
                      py-2 mt-2 w-48 
                      z-50
                      border dark:border-gray-700
                    "
                  >
                    {menuItem.children.map((child, childIndex) => (
                      <li key={`child-${childIndex}`}>
                        <Link
                          href={child.url}
                          className="
                            block px-4 py-2 
                            hover:bg-gray-100 
                            dark:hover:bg-gray-700
                            transition-colors
                          "
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:block group relative">
              <button className="
                text-xl text-gray-600 dark:text-gray-300
                hover:text-primary
                transition-colors
              ">
                <IoGlobeOutline />
              </button>
              <div className="
                absolute right-0 top-full 
                bg-white dark:bg-gray-800 
                shadow-lg rounded-md 
                py-2 mt-2 w-32 
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-300
                border dark:border-gray-700
              ">
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  English
                </button>
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  Español
                </button>
              </div>
            </div>

            {/* Search */}
            <button 
              onClick={() => setSearchModal(true)}
              className="
                text-xl text-gray-600 dark:text-gray-300
                hover:text-primary 
                transition-colors
                hidden md:block
              "
              aria-label="Open Search"
            >
              <IoSearch />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xl text-gray-600 dark:text-gray-300 hover:text-primary md:hidden"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          ```javascript
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: '100%' },
                visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.3 } },
                exit: { opacity: 0, x: '100%', transition: { type: 'tween', duration: 0.2 } }
              }}
              className="
                fixed top-0 right-0 
                w-64 h-full 
                bg-white dark:bg-gray-900 
                shadow-lg 
                z-50 
                md:hidden
                overflow-y-auto
              "
            >
              <div className="p-4 border-b dark:border-gray-700">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl float-right"
                  aria-label="Close Mobile Menu"
                >
                  <IoClose />
                </button>
              </div>
              <ul className="py-4">
                {main.map((menuItem, index) => (
                  <li key={`mobile-menu-${index}`} className="px-4 py-2">
                    {menuItem.hasChildren ? (
                      <div 
                        className="
                          flex justify-between 
                          items-center 
                          cursor-pointer 
                          hover:text-primary 
                          transition-colors
                        "
                        onClick={() => toggleDropdown(index)}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === index}
                      >
                        {menuItem.name}
                        <IoChevronDown 
                          className={`
                            ml-1 transition-transform 
                            ${activeDropdown === index ? 'rotate-180' : ''}
                          `} 
                        />
                      </div>
                    ) : (
                      <Link 
                        href={menuItem.url} 
                        className="
                          block hover:text-primary 
                          transition-colors
                        "
                        onClick={closeMobileMenu}
                      >
                        {menuItem.name}
                      </Link>
                    )}

                    {menuItem.hasChildren && activeDropdown === index && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="
                          bg-gray-100 dark:bg-gray-800 
                          rounded-md 
                          mt-2
                        "
                      >
                        {menuItem.children.map((child, childIndex) => (
                          <li key={`mobile-child-${childIndex}`}>
                            <Link
                              href={child.url}
                              className="
                                block px-4 py-2 
                                hover:bg-gray-200 
                                dark:hover:bg-gray-700
                                transition-colors
                              "
                              onClick={closeMobileMenu}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
        {/* Your blog title and content here */}
      </main>
    </>
  );
};

export default Header;

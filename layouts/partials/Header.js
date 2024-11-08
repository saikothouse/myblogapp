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
  IoChevronDown 
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

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 
          bg-white dark:bg-gray-900 
          py-2 transition-all 
          shadow-sm 
          ${navFixed ? "shadow" : "pt-4 md:pt-8"}
        `}
      >
        <nav className="navbar container flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Logo />
            
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="
                p-2 rounded-full 
                bg-gray-200 dark:bg-gray-700
                hover:bg-gray-300 dark:hover:bg-gray-600
                transition-colors
              "
            >
              {darkMode ? <IoSunny className="text-yellow-500" /> : <IoMoon className="text-indigo-500" />}
            </button>
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
              <li key={`menu-${index}`} className="relative group">
                {menuItem.hasChildren ? (
                  <div 
                    className="
                      flex items-center 
                      cursor-pointer 
                      hover:text-primary 
                      transition-colors
                    "
                    onClick={() => toggleDropdown(index)}
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
                    "
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
                      absolute top-full left-0 
                      bg-white dark:bg-gray-800 
                      shadow-lg rounded-md 
                      py-2 mt-2 w -48 
                      z-50
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setSearchModal(true)}
              className="text-xl hover:text-primary"
            >
              <IoSearch />
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xl hover:text-primary"
            >
              {mobileMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          {/* Search and User Actions for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setSearchModal(true)}
              className="
                text-xl text-dark 
                hover:text-primary 
                transition-colors
              "
            >
              <IoSearch />
            </button>
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
    </>
  );
};

export default Header;

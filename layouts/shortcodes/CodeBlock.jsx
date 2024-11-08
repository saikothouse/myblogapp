"use client";

import { useState } from 'react';
import { IoClipboard, IoCheckmark } from 'react-icons/io5';

const CodeBlock = ({ 
  lang = "javascript", 
  title, 
  children 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block relative my-4 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {title && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className={`language-${lang} p-4 overflow-x-auto`}>
          <code className={`language-${lang}`}>
            {children}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition"
        >
          {copied ? <IoCheckmark className="text-green-400" /> : <IoClipboard />}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;

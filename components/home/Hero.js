'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowDown } from 'react-icons/fa';

export default function Hero() {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mana.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Wallace Mukoka
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8">
          Agronomist & Author
        </p>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-12">
          Empowering communities through agricultural knowledge and personal development
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/articles"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Read Articles
          </Link>
          <Link
            href="/books"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Explore Books
          </Link>
        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-primary transition-colors"
        aria-label="Scroll to content"
      >
        <FaArrowDown className="w-6 h-6 animate-bounce" />
      </button>

      {/* Content Reference */}
      <div ref={contentRef} />
    </div>
  );
} 
'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaLeaf, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

export default function AboutPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Set ID for scroll target
    if (sectionRef.current) {
      sectionRef.current.id = 'about-preview';
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Wallace Mukoka</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dedicated to sharing knowledge and experience in agriculture and personal development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Agricultural Expertise</h3>
            <p className="text-gray-600">
              With years of experience in agronomy, Wallace provides practical insights and knowledge to help farmers improve their yields and practices.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBookOpen className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Published Author</h3>
            <p className="text-gray-600">
              As an author of multiple books, Wallace combines theoretical knowledge with practical applications to inspire readers.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGraduationCap className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Passionate Educator</h3>
            <p className="text-gray-600">
              Wallace is dedicated to educating and empowering individuals through his writing, workshops, and consulting.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
          >
            Learn more about Wallace
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 
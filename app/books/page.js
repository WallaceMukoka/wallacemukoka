'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBooks } from '../../utils/supabase';
import { FaBook, FaDownload, FaCalendar } from 'react-icons/fa';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await getBooks();
        if (error) throw error;
        setBooks(data || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gray-100 text-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Books</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore Wallace&apos;s published works on agriculture and personal development
          </p>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-64 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                      <FaBook className="text-6xl text-accent/40" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2 text-gray-500 text-sm">
                        <FaCalendar className="mr-2" />
                        {book.published_date && (
                          <span>Published: {formatDate(book.published_date)}</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{book.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                      <div className="flex justify-between items-center">
                        <Link 
                          href={`/books/${book.id}`}
                          className="inline-flex items-center text-gray-900 hover:text-gray-900/80 font-medium"
                        >
                          Learn More
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
                        {book.pdf_url && (
                          <a 
                            href={book.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-gray-600 hover:text-primary"
                            aria-label={`Download ${book.title}`}
                          >
                            <FaDownload />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-gray-900 text-3xl font-bold mb-6">Interested in More Resources?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Check out Wallace&apos;s articles for more insights on agriculture and personal development.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-900/10 transition-colors"
          >
            Browse Articles
          </Link>
        </div>
      </section>
    </div>
  );
} 
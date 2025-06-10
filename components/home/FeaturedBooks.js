'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBooks } from '../../utils/supabase';
import { FaBook, FaArrowRight } from 'react-icons/fa';

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await getBooks();
        if (error) throw error;
        
        // Sort by created_at and get latest 3 books
        const latestBooks = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);
        
        setBooks(latestBooks);
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Books</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover Wallace&apos;s published works on agriculture and personal development
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {books.map((book) => (
                <div key={book.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-64 relative">
                    {book.cover_image_url ? (
                      <img 
                        src={book.cover_image_url} 
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                        <FaBook className="text-6xl text-accent/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {book.published_date && `Published: ${formatDate(book.published_date)}`}
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                    <Link 
                      href={`/books/${book.id}`}
                      className="text-gray-900 inline-flex items-center bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
                    >
                      Learn More
                      <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/books"
                className="text-gray-900 inline-flex items-center justify-center px-6 py-3 border-2 border-gray-900 text-base font-medium rounded-md text-primary hover:bg-primary hover:text-gray-900 transition-colors"
              >
                View All Books
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 
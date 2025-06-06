'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../../../config/supabase-client';
import { FaBook, FaDownload, FaArrowLeft, FaCalendar, FaUser, FaDollarSign } from 'react-icons/fa';
import Image from 'next/image';

export default function BookDetailPage() {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('id', slug)
          .single();
        
        if (error) {
          console.error('Supabase error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        if (data) {
          setBook(data);
          
          // Fetch related books
          const { data: relatedData, error: relatedError } = await supabase
            .from('books')
            .select('*')
            .neq('id', data.id)
            .limit(2);
            
          if (relatedError) {
            console.error('Error fetching related books:', {
              message: relatedError.message,
              details: relatedError.details,
              hint: relatedError.hint,
              code: relatedError.code
            });
          }
          
          if (relatedData) {
            setRelatedBooks(relatedData);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          stack: error.stack
        });
        setLoading(false);
      }
    };

    if (slug) {
      fetchBook();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-start">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen pt-24 container mx-auto px-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-8">The book you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/books" 
            className="inline-flex items-center text-gray-900 hover:text-gray-900/80 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Book Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/books" 
              className="inline-flex items-center text-gray-900 hover:text-gray-900/80 mb-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Books
            </Link>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {book.cover_image_url && (
                <div className="w-full md:w-1/3">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={book.cover_image_url}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{book.title}</h1>
                
                {book.description && (
                  <p className="text-xl mb-6 text-white/90">{book.description}</p>
                )}
                
                <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2">
                  {book.author && (
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>{book.author}</span>
                    </div>
                  )}
                  
                  {book.published_date && (
                    <div className="flex items-center">
                      <FaCalendar className="mr-2" />
                      <span>Published: {formatDate(book.published_date)}</span>
                    </div>
                  )}
                  
                  {book.isbn && (
                    <div className="flex items-center">
                      <FaBook className="mr-2" />
                      <span>ISBN: {book.isbn}</span>
                    </div>
                  )}

                  {book.price && (
                    <div className="flex items-center">
                      <FaDollarSign className="mr-2" />
                      <span>{formatPrice(book.price)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
              {book.price && (
                <button
                  onClick={() => {
                    // Handle purchase/download logic
                    alert('Purchase functionality will be implemented here');
                  }}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  <FaDownload className="mr-2" />
                  Purchase Book
                </button>
              )}
            </div>

            <div className="prose prose-lg mx-auto text-gray-900">
              {book.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <p>{book.description}</p>
                </div>
              )}
            </div>
            
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Publication Details</h3>
              <ul className="space-y-2 text-gray-700">
                {book.author && <li><strong>Author:</strong> {book.author}</li>}
                {book.published_date && <li><strong>Publication Date:</strong> {formatDate(book.published_date)}</li>}
                {book.isbn && <li><strong>ISBN:</strong> {book.isbn}</li>}
                {book.price && <li><strong>Price:</strong> {formatPrice(book.price)}</li>}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">You May Also Like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBooks.map((relatedBook) => (
                  <div key={relatedBook.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {relatedBook.cover_image_url && (
                      <div className="relative h-48">
                        <Image
                          src={relatedBook.cover_image_url}
                          alt={relatedBook.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{relatedBook.title}</h3>
                      {relatedBook.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{relatedBook.description}</p>
                      )}
                      <Link 
                        href={`/books/${relatedBook.slug}`}
                        className="inline-flex items-center text-gray-900 hover:text-gray-900/80 font-medium"
                      >
                        View Book
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
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 
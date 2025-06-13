'use client';

import { useState, useEffect } from 'react';
import { getArticles, getBooks } from '../../utils/supabase';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [articlesResponse, booksResponse] = await Promise.all([
        getArticles(),
        getBooks()
      ]);

      if (articlesResponse.error) throw articlesResponse.error;
      if (booksResponse.error) throw booksResponse.error;

      setArticles(articlesResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Articles</h3>
              <p className="text-3xl font-bold text-gray-900">{articles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Books</h3>
              <p className="text-3xl font-bold text-gray-900">{books.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
          <Link
            href="/admin/articles"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Articles
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {article.cover_image_url && (
                <img
                  src={article.cover_image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {article.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.excerpt}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(article.published_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Books</h2>
          <Link
            href="/admin/books"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Books
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.slice(0, 3).map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {book.cover_image_url && (
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1">By {book.author}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{book.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {book.published_date && (
                      <span className="mr-4">
                        {new Date(book.published_date).toLocaleDateString()}
                      </span>
                    )}
                    {book.price && (
                      <span className="font-medium text-green-600">${parseFloat(book.price).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
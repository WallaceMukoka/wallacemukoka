'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '../../utils/supabase';
import { FaLeaf, FaLightbulb, FaSearch } from 'react-icons/fa';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await getArticles();
        if (error) throw error;
        setArticles(data || []);
        setFilteredArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    // Filter articles based on category and search term
    let result = articles;
    
    if (activeFilter !== 'all') {
      result = result.filter(article => article.category === activeFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(term) || 
        (article.excerpt && article.excerpt.toLowerCase().includes(term))
      );
    }
    
    setFilteredArticles(result);
  }, [activeFilter, searchTerm, articles]);

  const getCategoryIcon = (category) => {
    return category === 'agriculture' ? (
      <FaLeaf className="text-primary" />
    ) : (
      <FaLightbulb className="text-yellow-500" />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Use UTC methods to ensure consistent formatting
      const year = date.getUTCFullYear();
      const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
      const day = date.getUTCDate();
      return `${month} ${day}, ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gray-100 text-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Articles</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore Wallace&apos;s insights on agriculture and personal development
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition-colors`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('agriculture')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeFilter === 'agriculture'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition-colors`}
              >
                <FaLeaf className="mr-2" />
                Agriculture
              </button>
              <button
                onClick={() => setActiveFilter('motivation')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeFilter === 'motivation'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition-colors`}
              >
                <FaLightbulb className="mr-2" />
                Motivation
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">No articles found</h3>
                  <p className="text-gray-600">
                    Try changing your search terms or filters to find what you&apos;re looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48 w-full">
                        {article.cover_image_url ? (
                          <Image
                            src={article.cover_image_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-5xl opacity-30">{getCategoryIcon(article.category)}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {getCategoryIcon(article.category)}
                            <span className="ml-1 capitalize">{article.category}</span>
                          </span>
                          <span className="text-xs text-gray-500 ml-2">{formatDate(article.created_at)}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">{article.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                        <Link 
                          href={`/articles/${article.id}`}
                          className="inline-flex items-center text-gray-900 hover:text-gray-900/80 font-medium"
                        >
                          Read Article
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
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
} 
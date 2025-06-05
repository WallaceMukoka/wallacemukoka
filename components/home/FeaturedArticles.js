'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getArticles } from '../../utils/supabase';
import { FaArrowRight, FaLeaf, FaLightbulb } from 'react-icons/fa';

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await getArticles();
        if (error) throw error;
        
        // Sort by created_at and get latest 3 articles
        const latestArticles = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);
        
        setArticles(latestArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getCategoryIcon = (category) => {
    return category === 'agriculture' ? (
      <FaLeaf className="text-primary" />
    ) : (
      <FaLightbulb className="text-yellow-500" />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Articles</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore Wallace&apos;s latest insights on agriculture and personal development
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-5xl opacity-30">{getCategoryIcon(article.category)}</span>
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
                      className="text-gray-900 inline-flex items-center bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
                    >
                      Read More
                      <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/articles"
                className="text-gray-900 inline-flex items-center justify-center px-6 py-3 border-2 border-gray-900 text-base font-medium rounded-md text-primary hover:bg-primary hover:text-gray-900 transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 
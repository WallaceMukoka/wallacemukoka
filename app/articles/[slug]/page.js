'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../../../config/supabase-client';
import { FaLeaf, FaLightbulb, FaArrowLeft, FaClock, FaUser, FaCalendar } from 'react-icons/fa';
import Image from 'next/image';

export default function ArticleDetailPage() {
  const { slug: articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', articleId)
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
          setArticle(data);
          
          // Fetch related articles
          const { data: relatedData, error: relatedError } = await supabase
            .from('articles')
            .select('*')
            .neq('id', data.id)
            .eq('status', 'published')
            .limit(3);
            
          if (relatedError) {
            console.error('Error fetching related articles:', {
              message: relatedError.message,
              details: relatedError.details,
              hint: relatedError.hint,
              code: relatedError.code
            });
          }
          
          if (relatedData) {
            setRelatedArticles(relatedData);
          }
          }
          
          setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          stack: error.stack
        });
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-start">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 container mx-auto px-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/articles" 
            className="inline-flex items-center text-gray-900 hover:text-gray-900/80 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Article Header */}
      <section className="bg-gray-100 text-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-gray-900 hover:text-gray-900/80 mb-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Articles
            </Link>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {article.cover_image_url && (
                <div className="w-full md:w-1/3">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={article.cover_image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
              </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                
                {article.excerpt && (
                  <p className="text-xl mb-6 text-black/90">{article.excerpt}</p>
                )}
                
                <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2">
                  {article.author && (
              <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>{article.author}</span>
              </div>
                  )}
              
                  {article.published_date && (
              <div className="flex items-center">
                      <FaCalendar className="mr-2" />
                      <span>Published: {formatDate(article.published_date)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-900" dangerouslySetInnerHTML={{ __html: article.content }}></div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {relatedArticle.cover_image_url && (
                      <div className="relative h-48">
                        <Image
                          src={relatedArticle.cover_image_url}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover"
                        />
                    </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{relatedArticle.title}</h3>
                      {relatedArticle.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{relatedArticle.excerpt}</p>
                      )}
                      <Link 
                        href={`/articles/${relatedArticle.id}`}
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 
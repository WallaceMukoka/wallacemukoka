'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import { FaBook, FaDownload, FaArrowLeft, FaCalendar, FaFileAlt } from 'react-icons/fa';

export default function BookDetailPage() {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // In a real app, we would fetch from Supabase
        // const { data, error } = await supabase
        //   .from('books')
        //   .select('*')
        //   .eq('slug', slug)
        //   .single();
        
        // if (error) throw error;
        // setBook(data);

        // For this demo, we'll simulate an API call with a timeout
        setTimeout(() => {
          // Find the book in our dummy data that matches the slug
          const dummyBooks = [
            {
              id: 1,
              title: 'Modern Farming Techniques',
              description: 'A comprehensive guide to modern farming techniques for sustainable agriculture in today\'s changing climate.',
              content: `
                <h2>About This Book</h2>
                <p>Modern Farming Techniques is a comprehensive guide designed for farmers, agricultural students, and enthusiasts who want to stay at the forefront of agricultural innovation. In today's rapidly changing climate and economic landscape, adopting modern, sustainable farming practices is no longer optional—it's essential for long-term success.</p>
                
                <p>This book bridges traditional farming wisdom with cutting-edge technologies and methodologies, offering practical solutions for farmers of all scales. Whether you manage a small family farm or oversee large agricultural operations, you'll find valuable insights and actionable strategies to improve productivity, sustainability, and profitability.</p>
                
                <h2>What You'll Learn</h2>
                <ul>
                  <li>Precision Agriculture: Using GPS, sensors, and data analytics to optimize resource use</li>
                  <li>Sustainable Soil Management: Advanced techniques for building and maintaining healthy soil</li>
                  <li>Water Conservation Systems: Innovative irrigation and water management approaches</li>
                  <li>Integrated Pest Management: Ecological strategies for pest control with minimal chemical use</li>
                  <li>Climate-Smart Farming: Adapting agricultural practices to changing climate conditions</li>
                  <li>Technology Integration: Implementing drones, IoT devices, and farm management software</li>
                  <li>Renewable Energy Applications: Incorporating solar, wind, and biogas systems into farm operations</li>
                  <li>Post-Harvest Technologies: Modern approaches to storage, processing, and reducing losses</li>
                </ul>
                
                <h2>Table of Contents</h2>
                <ol>
                  <li>Introduction to Modern Agriculture</li>
                  <li>The Science of Soil Health</li>
                  <li>Advanced Water Management</li>
                  <li>Precision Farming Technologies</li>
                  <li>Sustainable Crop Protection</li>
                  <li>Climate Adaptation Strategies</li>
                  <li>Renewable Energy on the Farm</li>
                  <li>Digital Tools for Farm Management</li>
                  <li>Modern Livestock Management</li>
                  <li>Post-Harvest Handling and Storage</li>
                  <li>Marketing and Value Addition</li>
                  <li>Building Resilient Agricultural Systems</li>
                </ol>
                
                <h2>Who Should Read This Book</h2>
                <p>This book is ideal for:</p>
                <ul>
                  <li>Practicing farmers looking to update their methods</li>
                  <li>Agricultural students and researchers</li>
                  <li>Extension officers and agricultural advisors</li>
                  <li>Policymakers and agricultural development specialists</li>
                  <li>Agribusiness entrepreneurs and investors</li>
                  <li>Anyone interested in the future of sustainable food production</li>
                </ul>
              `,
              published_date: '2023-03-10',
              publisher: 'Agricultural Press International',
              isbn: '978-1234567890',
              pages: 184,
              slug: 'modern-farming-techniques',
              cover_image: null,
              file_path: 'modern-farming-techniques.pdf'
            },
            {
              id: 2,
              title: 'Agricultural Business Management',
              description: 'Learn how to build and manage a successful agricultural business from planning to execution and growth.',
              content: `
                <h2>About This Book</h2>
                <p>Agricultural Business Management is a comprehensive guide for farmers and agricultural entrepreneurs who want to transform their agricultural operations into thriving businesses. This book bridges the gap between farming expertise and business acumen, providing readers with the knowledge and tools needed to succeed in today's competitive agricultural market.</p>
                
                <p>Drawing on real-world case studies and proven business principles adapted specifically for agriculture, this practical guide takes readers through every aspect of establishing, managing, and growing an agricultural enterprise. From developing a sound business plan to marketing agricultural products effectively, this book covers the essential elements of agricultural entrepreneurship.</p>
                
                <h2>What You'll Learn</h2>
                <ul>
                  <li>Business Planning: Creating comprehensive business plans tailored to agricultural ventures</li>
                  <li>Financial Management: Budgeting, cash flow management, and financial analysis for farms</li>
                  <li>Risk Management: Identifying, assessing, and mitigating agricultural business risks</li>
                  <li>Marketing Strategies: Developing effective marketing plans for agricultural products</li>
                  <li>Value Chain Development: Adding value to primary agricultural products</li>
                  <li>Human Resource Management: Building and managing an effective farm workforce</li>
                  <li>Legal and Regulatory Compliance: Navigating the legal landscape of agricultural business</li>
                  <li>Growth Strategies: Scaling agricultural operations sustainably</li>
                </ul>
                
                <h2>Table of Contents</h2>
                <ol>
                  <li>The Business of Agriculture</li>
                  <li>Developing Your Agricultural Business Plan</li>
                  <li>Legal Structures for Agricultural Businesses</li>
                  <li>Financial Planning and Management</li>
                  <li>Agricultural Marketing Fundamentals</li>
                  <li>Building Your Agricultural Brand</li>
                  <li>Managing Farm Operations Efficiently</li>
                  <li>Technology Integration for Business Growth</li>
                  <li>Managing and Developing Your Farm Team</li>
                  <li>Risk Assessment and Mitigation</li>
                  <li>Accessing Capital and Funding</li>
                  <li>Scaling Your Agricultural Business</li>
                  <li>Succession Planning and Long-term Strategy</li>
                </ol>
                
                <h2>Who Should Read This Book</h2>
                <p>This book is ideal for:</p>
                <ul>
                  <li>Farmers looking to improve the business side of their operations</li>
                  <li>Agricultural entrepreneurs starting new ventures</li>
                  <li>Farm managers seeking to enhance operational efficiency</li>
                  <li>Agricultural students preparing for careers in agribusiness</li>
                  <li>Consultants working with agricultural businesses</li>
                  <li>Investors interested in the agricultural sector</li>
                </ul>
              `,
              published_date: '2022-11-15',
              publisher: 'Farm Business Publications',
              isbn: '978-0987654321',
              pages: 210,
              slug: 'agricultural-business-management',
              cover_image: null,
              file_path: 'agricultural-business-management.pdf'
            },
            {
              id: 3,
              title: 'Cultivating Success: Mindset for Growth',
              description: 'Develop the mindset needed to achieve success in both personal and professional aspects of life.',
              content: `
                <h2>About This Book</h2>
                <p>Cultivating Success: Mindset for Growth is a transformative guide that explores the powerful connection between mindset and achievement. Drawing on principles of positive psychology, neuroscience, and real-world success stories, this book provides readers with practical tools to develop a growth-oriented mindset that can lead to breakthrough results in all areas of life.</p>
                
                <p>Unlike many self-help books that offer superficial advice, this work delves deep into the psychological mechanisms that drive success, offering evidence-based strategies that readers can immediately apply to overcome limitations and unlock their full potential. The principles shared in this book are particularly relevant for those in challenging fields like agriculture, where resilience and adaptability are essential qualities.</p>
                
                <h2>What You'll Learn</h2>
                <ul>
                  <li>The Science of Mindset: Understanding how your thoughts shape your reality</li>
                  <li>Growth vs. Fixed Mindset: Identifying and transforming limiting beliefs</li>
                  <li>Resilience Building: Developing mental toughness to overcome adversity</li>
                  <li>Goal Setting: Creating compelling, achievable goals that drive action</li>
                  <li>Habit Formation: Establishing routines that support success</li>
                  <li>Emotional Intelligence: Managing emotions for better decision-making</li>
                  <li>Motivation Mastery: Maintaining drive and commitment through challenges</li>
                  <li>Practical Applications: Applying growth mindset principles in specific life domains</li>
                </ul>
                
                <h2>Table of Contents</h2>
                <ol>
                  <li>The Power of Mindset</li>
                  <li>Understanding the Growth Mindset</li>
                  <li>Identifying Your Current Mindset</li>
                  <li>Overcoming Limiting Beliefs</li>
                  <li>The Neuroscience of Change</li>
                  <li>Building Unshakable Resilience</li>
                  <li>Setting Goals That Inspire Action</li>
                  <li>Developing Success Habits</li>
                  <li>Emotional Intelligence for Achievement</li>
                  <li>Maintaining Motivation Through Challenges</li>
                  <li>Mindset in Relationships</li>
                  <li>Mindset in Professional Growth</li>
                  <li>Living Your Best Life: Integrating Mindset Principles</li>
                </ol>
                
                <h2>Who Should Read This Book</h2>
                <p>This book is ideal for:</p>
                <ul>
                  <li>Individuals seeking personal and professional growth</li>
                  <li>Entrepreneurs and business leaders facing challenges</li>
                  <li>Students and lifelong learners</li>
                  <li>Coaches, mentors, and teachers who guide others</li>
                  <li>Anyone facing significant life transitions or obstacles</li>
                  <li>Professionals in high-stress or uncertain environments</li>
                </ul>
              `,
              published_date: '2023-01-20',
              publisher: 'Personal Development Press',
              isbn: '978-1122334455',
              pages: 156,
              slug: 'cultivating-success-mindset',
              cover_image: null,
              file_path: 'cultivating-success-mindset.pdf'
            }
          ];

          const foundBook = dummyBooks.find(book => book.slug === slug);
          
          if (foundBook) {
            setBook(foundBook);
            
            // Set related books (excluding current book)
            const related = dummyBooks
              .filter(b => b.id !== foundBook.id)
              .slice(0, 2);
            setRelatedBooks(related);
          }
          
          setLoading(false);
        }, 500);

      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchBook();
    }
  }, [slug]);

  const formatDate = (dateString) => {
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
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{book.title}</h1>
            
            <p className="text-xl mb-6 text-white/90">{book.description}</p>
            
            <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2">
              <div className="flex items-center">
                <FaCalendar className="mr-2" />
                <span>Published: {formatDate(book.published_date)}</span>
              </div>
              
              <div className="flex items-center">
                <FaFileAlt className="mr-2" />
                <span>{book.pages} pages</span>
              </div>
              
              {book.isbn && (
                <div className="flex items-center">
                  <FaBook className="mr-2" />
                  <span>ISBN: {book.isbn}</span>
                </div>
              )}
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
              <button
                onClick={() => {
                  alert('In a real app, this would download the book PDF');
                }}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <FaDownload className="mr-2" />
                Download Book
              </button>
            </div>

            <div className="prose prose-lg mx-auto text-gray-900" dangerouslySetInnerHTML={{ __html: book.content }}></div>
            
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Publication Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Publisher:</strong> {book.publisher}</li>
                <li><strong>Publication Date:</strong> {formatDate(book.published_date)}</li>
                <li><strong>ISBN:</strong> {book.isbn}</li>
                <li><strong>Pages:</strong> {book.pages}</li>
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
                    <div className="h-40 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                      <FaBook className="text-5xl text-accent/40" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{relatedBook.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{relatedBook.description}</p>
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
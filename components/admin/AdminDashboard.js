'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';
import { FaPlus, FaEdit, FaTrash, FaBook, FaNewspaper, FaSignOutAlt, FaUser } from 'react-icons/fa';
import ArticleForm from './ArticleForm';
import BookForm from './BookForm';
import ArticlesList from './ArticlesList';
import BooksList from './BooksList';
import toast from 'react-hot-toast';

export default function AdminDashboard({ user }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('articles');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from Supabase
        // const { data: articlesData, error: articlesError } = await supabase
        //   .from('articles')
        //   .select('*')
        //   .order('created_at', { ascending: false });
        
        // if (articlesError) throw articlesError;
        
        // const { data: booksData, error: booksError } = await supabase
        //   .from('books')
        //   .select('*')
        //   .order('published_date', { ascending: false });
        
        // if (booksError) throw booksError;
        
        // setArticles(articlesData || []);
        // setBooks(booksData || []);

        // For now, we'll use placeholder data
        const dummyArticles = [
          {
            id: 1,
            title: 'Sustainable Farming Practices for Small-Scale Farmers',
            excerpt: 'Learn about sustainable farming techniques that can help small-scale farmers improve productivity while preserving the environment.',
            content: 'Full content would go here...',
            category: 'agriculture',
            created_at: '2023-06-15T10:30:00Z',
            slug: 'sustainable-farming-practices'
          },
          {
            id: 2,
            title: 'Overcoming Challenges in Agricultural Entrepreneurship',
            excerpt: 'Discover strategies to overcome common challenges faced by agricultural entrepreneurs in today\'s competitive market.',
            content: 'Full content would go here...',
            category: 'agriculture',
            created_at: '2023-05-22T14:45:00Z',
            slug: 'overcoming-challenges-agricultural-entrepreneurship'
          },
          {
            id: 3,
            title: 'Building Resilience: Mental Strength for Success',
            excerpt: 'Explore practical tips and techniques to build mental resilience that can help you overcome obstacles and achieve your goals.',
            content: 'Full content would go here...',
            category: 'motivation',
            created_at: '2023-07-03T09:15:00Z',
            slug: 'building-resilience-mental-strength'
          }
        ];

        const dummyBooks = [
          {
            id: 1,
            title: 'Modern Farming Techniques',
            description: 'A comprehensive guide to modern farming techniques for sustainable agriculture in today\'s changing climate.',
            published_date: '2023-03-10',
            publisher: 'Agricultural Press International',
            isbn: '978-1234567890',
            pages: 184,
            slug: 'modern-farming-techniques',
            file_path: 'modern-farming-techniques.pdf'
          },
          {
            id: 2,
            title: 'Agricultural Business Management',
            description: 'Learn how to build and manage a successful agricultural business from planning to execution and growth.',
            published_date: '2022-11-15',
            publisher: 'Farm Business Publications',
            isbn: '978-0987654321',
            pages: 210,
            slug: 'agricultural-business-management',
            file_path: 'agricultural-business-management.pdf'
          },
          {
            id: 3,
            title: 'Cultivating Success: Mindset for Growth',
            description: 'Develop the mindset needed to achieve success in both personal and professional aspects of life.',
            published_date: '2023-01-20',
            publisher: 'Personal Development Press',
            isbn: '978-1122334455',
            pages: 156,
            slug: 'cultivating-success-mindset',
            file_path: 'cultivating-success-mindset.pdf'
          }
        ];

        setArticles(dummyArticles);
        setBooks(dummyBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const handleAddItem = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      if (activeTab === 'articles') {
        // In a real app, we would delete from Supabase
        // const { error } = await supabase
        //   .from('articles')
        //   .delete()
        //   .eq('id', id);
        
        // if (error) throw error;
        
        // For now, we'll just update the local state
        setArticles(articles.filter(article => article.id !== id));
        toast.success('Article deleted successfully');
      } else {
        // In a real app, we would delete from Supabase
        // const { error } = await supabase
        //   .from('books')
        //   .delete()
        //   .eq('id', id);
        
        // if (error) throw error;
        
        // For now, we'll just update the local state
        setBooks(books.filter(book => book.id !== id));
        toast.success('Book deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (activeTab === 'articles') {
        if (editItem) {
          // Editing existing article
          // In a real app, we would update in Supabase
          // const { error } = await supabase
          //   .from('articles')
          //   .update(data)
          //   .eq('id', editItem.id);
          
          // if (error) throw error;
          
          // For now, we'll just update the local state
          setArticles(articles.map(article => 
            article.id === editItem.id ? { ...article, ...data } : article
          ));
          toast.success('Article updated successfully');
        } else {
          // Adding new article
          // In a real app, we would insert into Supabase
          // const { data: newArticle, error } = await supabase
          //   .from('articles')
          //   .insert([data])
          //   .select();
          
          // if (error) throw error;
          
          // For now, we'll just update the local state with a fake ID
          const newArticle = { 
            ...data, 
            id: Date.now(), 
            created_at: new Date().toISOString(),
            slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          };
          setArticles([newArticle, ...articles]);
          toast.success('Article added successfully');
        }
      } else {
        if (editItem) {
          // Editing existing book
          // In a real app, we would update in Supabase
          // const { error } = await supabase
          //   .from('books')
          //   .update(data)
          //   .eq('id', editItem.id);
          
          // if (error) throw error;
          
          // For now, we'll just update the local state
          setBooks(books.map(book => 
            book.id === editItem.id ? { ...book, ...data } : book
          ));
          toast.success('Book updated successfully');
        } else {
          // Adding new book
          // In a real app, we would insert into Supabase
          // const { data: newBook, error } = await supabase
          //   .from('books')
          //   .insert([data])
          //   .select();
          
          // if (error) throw error;
          
          // For now, we'll just update the local state with a fake ID
          const newBook = { 
            ...data, 
            id: Date.now(),
            slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          };
          setBooks([newBook, ...books]);
          toast.success('Book added successfully');
        }
      }
      
      // Close the form after successful submission
      setShowForm(false);
      setEditItem(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save item');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditItem(null);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-2">Manage your articles and books</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="mr-6 flex items-center">
                <FaUser className="mr-2" />
                <span>{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 ${
                activeTab === 'articles'
                  ? 'border-b-2 border-primary text-primary font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } flex items-center`}
              onClick={() => setActiveTab('articles')}
            >
              <FaNewspaper className="mr-2" />
              Articles
            </button>
            <button
              className={`py-3 px-6 ${
                activeTab === 'books'
                  ? 'border-b-2 border-primary text-primary font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } flex items-center`}
              onClick={() => setActiveTab('books')}
            >
              <FaBook className="mr-2" />
              Books
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mb-6">
            <button
              onClick={handleAddItem}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <FaPlus className="mr-2" />
              Add {activeTab === 'articles' ? 'Article' : 'Book'}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                {editItem 
                  ? `Edit ${activeTab === 'articles' ? 'Article' : 'Book'}`
                  : `Add New ${activeTab === 'articles' ? 'Article' : 'Book'}`
                }
              </h2>
              {activeTab === 'articles' ? (
                <ArticleForm 
                  initialData={editItem} 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCancelForm} 
                />
              ) : (
                <BookForm 
                  initialData={editItem} 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCancelForm} 
                />
              )}
            </div>
          )}

          {/* Content List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            activeTab === 'articles' ? (
              <ArticlesList 
                articles={articles} 
                onEdit={handleEditItem} 
                onDelete={handleDeleteItem} 
              />
            ) : (
              <BooksList 
                books={books} 
                onEdit={handleEditItem} 
                onDelete={handleDeleteItem} 
              />
            )
          )}
        </div>
      </section>
    </div>
  );
} 
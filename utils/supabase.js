import { supabase } from '../config/supabase-client';

// Auth functions
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null, error };
  }
};

// Books functions
export const getBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { data: null, error };
  }
};

export const createBook = async (bookData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([bookData])
      .select()
      .single();
    return { data, error };
  } catch (error) {
    console.error('Error creating book:', error);
    return { data: null, error };
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .update(bookData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  } catch (error) {
    console.error('Error updating book:', error);
    return { data: null, error };
  }
};

export const deleteBook = async (id) => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);
    return { error };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { error };
  }
};

// Articles functions
export const getArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { data: null, error };
  }
};

export const createArticle = async (articleData) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();
    return { data, error };
  } catch (error) {
    console.error('Error creating article:', error);
    return { data: null, error };
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  } catch (error) {
    console.error('Error updating article:', error);
    return { data: null, error };
  }
};

export const deleteArticle = async (id) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    return { error };
  } catch (error) {
    console.error('Error deleting article:', error);
    return { error };
  }
};

// Function to get URL for images
export const getImageUrl = (path) => {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article-images/${path}`;
};

// Function to get URL for books (PDFs)
export const getBookUrl = (path) => {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/books/${path}`;
};

// Storage functions
export const uploadArticleImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('article-images')
      .upload(fileName, file);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error uploading article image:', error);
    return { data: null, error };
  }
};

export const uploadBookFile = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('books')
      .upload(fileName, file);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error uploading book file:', error);
    return { data: null, error };
  }
};

// This is a mock Supabase client for the Wallace Mukoka website demo
// In a real application, you would initialize the Supabase client with your project URL and anon key

export const supabaseMock = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Demo credentials check
      if (email === 'admin@example.com' && password === 'password123') {
        return {
          data: {
            user: {
              id: 'mock-user-id',
              email,
              user_metadata: { name: 'Admin User' },
              role: 'admin'
            },
            session: {
              access_token: 'mock-token'
            }
          },
          error: null
        };
      }
      
      return {
        data: null,
        error: { message: 'Invalid login credentials' }
      };
    },
    
    signOut: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { error: null };
    },
    
    getSession: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Check for stored user in localStorage
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('wallacemukoka_admin_user') : null;
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return {
          data: {
            session: {
              user,
              access_token: 'mock-token'
            }
          },
          error: null
        };
      }
      
      return { data: { session: null }, error: null };
    },
    
    onAuthStateChange: (callback) => {
      // This would normally set up a listener for auth state changes
      // For our demo, we'll just return a mock unsubscribe function
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    }
  },
  
  from: (table) => {
    return {
      select: () => {
        return {
          eq: async (column, value) => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Mock data based on table and filters
            let data = [];
            
            if (table === 'articles') {
              data = [
                {
                  id: 1,
                  title: 'Sustainable Farming Practices in Eastern Africa',
                  slug: 'sustainable-farming-practices',
                  excerpt: 'Exploring various sustainable farming methods that work well in the Eastern African climate and soil conditions.',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  category: 'Farming',
                  published_date: '2023-05-15',
                  image_url: '/images/articles/sustainable-farming.jpg'
                },
                {
                  id: 2,
                  title: 'Water Conservation Techniques for Small Farms',
                  slug: 'water-conservation-techniques',
                  excerpt: 'Simple but effective water conservation techniques that small-scale farmers can implement.',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  category: 'Water Management',
                  published_date: '2023-06-22',
                  image_url: '/images/articles/water-conservation.jpg'
                },
                {
                  id: 3,
                  title: 'Crop Rotation Benefits for Soil Health',
                  slug: 'crop-rotation-benefits',
                  excerpt: 'How implementing crop rotation can significantly improve soil health and crop yields over time.',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  category: 'Soil Management',
                  published_date: '2023-07-10',
                  image_url: '/images/articles/crop-rotation.jpg'
                }
              ];
            } else if (table === 'books') {
              data = [
                {
                  id: 1,
                  title: 'Modern Agricultural Practices',
                  slug: 'modern-agricultural-practices',
                  description: 'A comprehensive guide to modern and sustainable agricultural practices for the African continent.',
                  content: 'This book covers everything from soil preparation to harvest techniques.',
                  published_date: '2022-03-15',
                  publisher: 'Africa Agricultural Press',
                  isbn: '978-1234567890',
                  pages: 320,
                  image_url: '/images/books/modern-agriculture.jpg',
                  file_path: 'modern-agriculture.pdf'
                },
                {
                  id: 2,
                  title: 'Water Management for Arid Regions',
                  slug: 'water-management-arid-regions',
                  description: 'Expert strategies for managing water resources in arid and semi-arid regions.',
                  content: 'Learn how to conserve and efficiently use water in farming.',
                  published_date: '2022-09-10',
                  publisher: 'Conservation Publishing',
                  isbn: '978-0987654321',
                  pages: 248,
                  image_url: '/images/books/water-management.jpg',
                  file_path: 'water-management.pdf'
                },
                {
                  id: 3,
                  title: 'Organic Farming Handbook',
                  slug: 'organic-farming-handbook',
                  description: 'A practical guide to implementing organic farming methods in various climates.',
                  content: 'This handbook provides step-by-step instructions for transitioning to organic farming.',
                  published_date: '2023-01-22',
                  publisher: 'Green Earth Publications',
                  isbn: '978-5678901234',
                  pages: 275,
                  image_url: '/images/books/organic-farming.jpg',
                  file_path: 'organic-farming.pdf'
                }
              ];
            }
            
            // Filter based on column and value if necessary
            if (column && value) {
              data = data.filter(item => item[column] === value);
            }
            
            return { data, error: null };
          },
          
          order: () => {
            return {
              limit: async () => {
                // Mock implementation - would normally apply ordering and limits
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 300));
                
                let data = [];
                
                if (table === 'articles') {
                  data = [
                    {
                      id: 1,
                      title: 'Sustainable Farming Practices in Eastern Africa',
                      slug: 'sustainable-farming-practices',
                      excerpt: 'Exploring various sustainable farming methods that work well in the Eastern African climate and soil conditions.',
                      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      category: 'Farming',
                      published_date: '2023-05-15',
                      image_url: '/images/articles/sustainable-farming.jpg'
                    },
                    {
                      id: 2,
                      title: 'Water Conservation Techniques for Small Farms',
                      slug: 'water-conservation-techniques',
                      excerpt: 'Simple but effective water conservation techniques that small-scale farmers can implement.',
                      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      category: 'Water Management',
                      published_date: '2023-06-22',
                      image_url: '/images/articles/water-conservation.jpg'
                    },
                    {
                      id: 3,
                      title: 'Crop Rotation Benefits for Soil Health',
                      slug: 'crop-rotation-benefits',
                      excerpt: 'How implementing crop rotation can significantly improve soil health and crop yields over time.',
                      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      category: 'Soil Management',
                      published_date: '2023-07-10',
                      image_url: '/images/articles/crop-rotation.jpg'
                    }
                  ];
                } else if (table === 'books') {
                  data = [
                    {
                      id: 1,
                      title: 'Modern Agricultural Practices',
                      slug: 'modern-agricultural-practices',
                      description: 'A comprehensive guide to modern and sustainable agricultural practices for the African continent.',
                      content: 'This book covers everything from soil preparation to harvest techniques.',
                      published_date: '2022-03-15',
                      publisher: 'Africa Agricultural Press',
                      isbn: '978-1234567890',
                      pages: 320,
                      image_url: '/images/books/modern-agriculture.jpg',
                      file_path: 'modern-agriculture.pdf'
                    },
                    {
                      id: 2,
                      title: 'Water Management for Arid Regions',
                      slug: 'water-management-arid-regions',
                      description: 'Expert strategies for managing water resources in arid and semi-arid regions.',
                      content: 'Learn how to conserve and efficiently use water in farming.',
                      published_date: '2022-09-10',
                      publisher: 'Conservation Publishing',
                      isbn: '978-0987654321',
                      pages: 248,
                      image_url: '/images/books/water-management.jpg',
                      file_path: 'water-management.pdf'
                    },
                    {
                      id: 3,
                      title: 'Organic Farming Handbook',
                      slug: 'organic-farming-handbook',
                      description: 'A practical guide to implementing organic farming methods in various climates.',
                      content: 'This handbook provides step-by-step instructions for transitioning to organic farming.',
                      published_date: '2023-01-22',
                      publisher: 'Green Earth Publications',
                      isbn: '978-5678901234',
                      pages: 275,
                      image_url: '/images/books/organic-farming.jpg',
                      file_path: 'organic-farming.pdf'
                    }
                  ];
                }
                
                return { data, error: null };
              }
            };
          }
        };
      },
      
      insert: async (data) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Mock successful insert
        return {
          data: { ...data, id: Math.floor(Math.random() * 1000) },
          error: null
        };
      },
      
      update: async (data) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Mock successful update
        return {
          data,
          error: null
        };
      },
      
      delete: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock successful delete
        return {
          data: { success: true },
          error: null
        };
      }
    };
  },
  
  storage: {
    from: (bucket) => {
      return {
        upload: async (fileName, file) => {
          // Simulate network delay for file upload
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock successful upload
          return {
            data: { path: fileName },
            error: null
          };
        },
        
        getPublicUrl: (path) => {
          // Mock public URL generation
          return {
            data: { publicUrl: `/storage/${bucket}/${path}` }
          };
        }
      };
    }
  }
}; 
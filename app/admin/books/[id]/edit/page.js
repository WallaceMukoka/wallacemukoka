'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBooks, updateBook, uploadBookFile, getImageUrl } from '../../../../../utils/supabase';
import toast from 'react-hot-toast';
import { use } from 'react';

export default function EditBookPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    cover_image_url: '',
    published_date: '',
    isbn: '',
    price: '',
    pdf_url: ''
  });

  const bookId = use(params).id;

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const { data, error } = await getBooks();
      if (error) throw error;
      const book = data.find(book => book.id === bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      setFormData({
        title: book.title || '',
        description: book.description || '',
        author: book.author || '',
        cover_image_url: book.cover_image_url || '',
        published_date: book.published_date || '',
        isbn: book.isbn || '',
        price: book.price || '',
        pdf_url: book.pdf_url || ''
      });
    } catch (error) {
      console.error('Error fetching book:', error);
      toast.error('Failed to fetch book');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast.error('Please select a PDF file');
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let pdfPath = formData.pdf_url;
      let coverImagePath = formData.cover_image_url;

      if (selectedFile) {
        setUploading(true);
        const { data, error } = await uploadBookFile(selectedFile);
        if (error) throw error;
        pdfPath = getImageUrl(data.path);
        setUploading(false);
      }

      if (selectedImage) {
        setUploading(true);
        const { data, error } = await uploadBookFile(selectedImage);
        if (error) throw error;
        coverImagePath = getImageUrl(data.path);
        setUploading(false);
      }

      const { error } = await updateBook(bookId, {
        ...formData,
        pdf_url: pdfPath,
        cover_image_url: coverImagePath,
        price: parseFloat(formData.price) || 0
      });

      if (error) throw error;
      toast.success('Book updated successfully');
      router.push('/admin/books');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Edit Book</h2>
        <p className="text-gray-600">Update the book details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
              id="cover-image"
            />
            <label
              htmlFor="cover-image"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {selectedImage ? 'Change Image' : 'Upload Cover Image'}
            </label>
            {selectedImage && (
              <span className="ml-3 text-sm text-gray-500">
                {selectedImage.name}
              </span>
            )}
            {!selectedImage && formData.cover_image_url && (
              <span className="ml-3 text-sm text-gray-500">
                Current image: {formData.cover_image_url.split('/').pop()}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="sr-only"
              id="pdf-file"
            />
            <label
              htmlFor="pdf-file"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {selectedFile ? 'Change PDF' : 'Upload PDF'}
            </label>
            {selectedFile && (
              <span className="ml-3 text-sm text-gray-500">
                {selectedFile.name}
              </span>
            )}
            {!selectedFile && formData.pdf_url && (
              <span className="ml-3 text-sm text-gray-500">
                Current PDF: {formData.pdf_url.split('/').pop()}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
          <input
            type="date"
            value={formData.published_date || ''}
            onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
          <input
            type="text"
            value={formData.isbn || ''}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/books')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || uploading ? 'Updating...' : 'Update Book'}
          </button>
        </div>
      </form>
    </div>
  );
} 
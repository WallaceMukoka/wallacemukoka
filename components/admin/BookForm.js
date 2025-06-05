'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';

export default function BookForm({ initialData, onSubmit, onCancel }) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      content: '',
      published_date: new Date().toISOString().split('T')[0],
      publisher: '',
      isbn: '',
      pages: '',
      file_path: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      // Format the date for the input field
      const formattedData = {
        ...initialData,
        published_date: initialData.published_date ? new Date(initialData.published_date).toISOString().split('T')[0] : ''
      };
      reset(formattedData);
    }
  }, [initialData, reset]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return null;
    
    setIsUploading(true);
    
    try {
      // In a real app with Supabase, we would do:
      // const fileName = `${Date.now()}_${selectedFile.name}`;
      // const { data, error } = await supabase.storage
      //   .from('books')
      //   .upload(fileName, selectedFile);
      
      // if (error) throw error;
      // return fileName;
      
      // For this demo, we'll just simulate an upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      return selectedFile.name;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    // If a file was selected, upload it first
    if (selectedFile) {
      const filePath = await handleFileUpload();
      if (filePath) {
        data.file_path = filePath;
      }
    }
    
    // Convert pages to number
    if (data.pages) {
      data.pages = parseInt(data.pages, 10);
    }
    
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.title ? 'border-red-500' : ''}`}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="published_date" className="block text-sm font-medium text-gray-700 mb-1">
            Publication Date
          </label>
          <input
            type="date"
            id="published_date"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.published_date ? 'border-red-500' : ''}`}
            {...register('published_date', { required: 'Publication date is required' })}
          />
          {errors.published_date && (
            <p className="mt-1 text-sm text-red-600">{errors.published_date.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.publisher ? 'border-red-500' : ''}`}
            {...register('publisher', { required: 'Publisher is required' })}
          />
          {errors.publisher && (
            <p className="mt-1 text-sm text-red-600">{errors.publisher.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.isbn ? 'border-red-500' : ''}`}
            {...register('isbn', { required: 'ISBN is required' })}
          />
          {errors.isbn && (
            <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Pages
          </label>
          <input
            type="number"
            id="pages"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.pages ? 'border-red-500' : ''}`}
            {...register('pages', { 
              required: 'Number of pages is required',
              min: { value: 1, message: 'Pages must be at least 1' }
            })}
          />
          {errors.pages && (
            <p className="mt-1 text-sm text-red-600">{errors.pages.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.description ? 'border-red-500' : ''}`}
          {...register('description', { required: 'Description is required' })}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Book Details (HTML supported)
        </label>
        <textarea
          id="content"
          rows={8}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono text-sm ${errors.content ? 'border-red-500' : ''}`}
          {...register('content', { required: 'Content is required' })}
        ></textarea>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="book_file" className="block text-sm font-medium text-gray-700 mb-1">
          Book File (PDF)
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="book_file"
            accept=".pdf"
            onChange={handleFileChange}
            className="sr-only"
          />
          <label
            htmlFor="book_file"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaUpload className="mr-2" />
            {selectedFile ? 'Change File' : 'Upload PDF'}
          </label>
          {selectedFile && (
            <span className="ml-3 text-sm text-gray-500">
              {selectedFile.name}
            </span>
          )}
          {!selectedFile && initialData && initialData.file_path && (
            <span className="ml-3 text-sm text-gray-500">
              Current file: {initialData.file_path}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {(isSubmitting || isUploading) ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isUploading ? 'Uploading...' : 'Saving...'}
            </>
          ) : (
            <>
              <FaSave className="mr-2" />
              Save Book
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
      </div>
    </form>
  );
} 
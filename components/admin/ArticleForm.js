'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { FaSave, FaTimes } from 'react-icons/fa';

export default function ArticleForm({ initialData, onSubmit, onCancel }) {
  const [isUploading, setIsUploading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialData || {
      title: '',
      excerpt: '',
      content: '',
      category: 'agriculture'
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.category ? 'border-red-500' : ''}`}
          {...register('category', { required: 'Category is required' })}
        >
          <option value="agriculture">Agriculture</option>
          <option value="motivation">Motivation</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={3}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.excerpt ? 'border-red-500' : ''}`}
          {...register('excerpt', { required: 'Excerpt is required' })}
        ></textarea>
        {errors.excerpt && (
          <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content (HTML supported)
        </label>
        <textarea
          id="content"
          rows={10}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono text-sm ${errors.content ? 'border-red-500' : ''}`}
          {...register('content', { required: 'Content is required' })}
        ></textarea>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="mr-2" />
              Save Article
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
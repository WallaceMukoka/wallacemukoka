'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { supabase } from '../../config/supabase-client';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        }]);
      
      if (error) throw error;

      toast.success('Message sent successfully!');
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gray-100 text-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Wallace</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or interested in collaboration? Get in touch with Wallace directly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-10">
              {/* Contact Form */}
              <div className="max-w-3xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h2>
                
                {submitted ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-green-800">Message Sent</h3>
                        <div className="mt-2 text-green-700">
                          <p>Thank you for your message! Wallace will get back to you as soon as possible.</p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="text-sm font-medium text-green-700 hover:text-green-600"
                          >
                            Send another message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className={`block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-3 text-gray-900 ${errors.name ? 'border-red-500' : ''}`}
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className={`block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-3 text-gray-900 ${errors.email ? 'border-red-500' : ''}`}
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className={`block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-3 text-gray-900 ${errors.subject ? 'border-red-500' : ''}`}
                        {...register('subject', { required: 'Subject is required' })}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        className={`block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-3 text-gray-900 ${errors.message ? 'border-red-500' : ''}`}
                        {...register('message', { required: 'Message is required' })}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
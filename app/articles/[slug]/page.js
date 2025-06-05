'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import { FaLeaf, FaLightbulb, FaArrowLeft, FaClock, FaFolder } from 'react-icons/fa';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // In a real app, we would fetch from Supabase
        // const { data, error } = await supabase
        //   .from('articles')
        //   .select('*')
        //   .eq('slug', slug)
        //   .single();
        
        // if (error) throw error;
        // setArticle(data);

        // For this demo, we'll simulate an API call with a timeout
        setTimeout(() => {
          // Find the article in our dummy data that matches the slug
          const dummyArticles = [
            {
              id: 1,
              title: 'Sustainable Farming Practices for Small-Scale Farmers',
              excerpt: 'Learn about sustainable farming techniques that can help small-scale farmers improve productivity while preserving the environment.',
              content: `
                <p>Sustainable farming is a holistic approach to agriculture that focuses on meeting current food needs without compromising the ability of future generations to meet their own needs. For small-scale farmers, implementing sustainable practices can lead to improved yields, reduced costs, and healthier ecosystems.</p>
                
                <h2>Key Sustainable Farming Practices</h2>
                
                <h3>1. Crop Rotation</h3>
                <p>Crop rotation is the practice of growing different types of crops in the same area across different growing seasons. This helps to reduce soil erosion, increase soil fertility and crop yield, and prevent the buildup of pathogens and pests that often occurs when one species is continuously cropped.</p>
                
                <h3>2. Water Conservation</h3>
                <p>Efficient water management is crucial for sustainable farming. Techniques include drip irrigation, rainwater harvesting, and using drought-resistant crops. These methods help conserve water while ensuring crops receive adequate moisture.</p>
                
                <h3>3. Natural Pest Management</h3>
                <p>Instead of relying solely on chemical pesticides, sustainable farmers use integrated pest management (IPM) strategies. These include introducing beneficial insects, using companion planting, and implementing biological controls to manage pest populations.</p>
                
                <h3>4. Soil Health Management</h3>
                <p>Maintaining soil health is fundamental to sustainable agriculture. Practices include adding organic matter through composting, minimizing soil disturbance through reduced tillage, and using cover crops to prevent erosion and add nutrients.</p>
                
                <h2>Benefits for Small-Scale Farmers</h2>
                
                <p>Implementing sustainable farming practices offers numerous benefits for small-scale farmers:</p>
                
                <ul>
                  <li>Reduced input costs through decreased reliance on synthetic fertilizers and pesticides</li>
                  <li>Improved crop resilience to climate change and extreme weather events</li>
                  <li>Enhanced biodiversity on the farm, which contributes to natural pest control</li>
                  <li>Better long-term soil productivity, leading to consistent yields over time</li>
                  <li>Potential premium prices for sustainably grown produce in certain markets</li>
                </ul>
                
                <h2>Getting Started with Sustainable Farming</h2>
                
                <p>For small-scale farmers looking to transition to more sustainable practices, it's often best to start small and gradually implement changes. Begin by assessing your current farming system and identifying areas where sustainable practices could be integrated most easily.</p>
                
                <p>Consider joining farmer networks or seeking training from agricultural extension services that focus on sustainable methods. Many organizations offer resources and support for farmers transitioning to sustainable agriculture.</p>
                
                <p>Remember that sustainable farming is not just about environmental conservation—it's also about creating a viable, profitable farming business that can sustain itself and the farmer's livelihood for years to come.</p>
              `,
              category: 'agriculture',
              created_at: '2023-06-15T10:30:00Z',
              slug: 'sustainable-farming-practices',
              reading_time: 8
            },
            {
              id: 2,
              title: 'Overcoming Challenges in Agricultural Entrepreneurship',
              excerpt: 'Discover strategies to overcome common challenges faced by agricultural entrepreneurs in today\'s competitive market.',
              content: `
                <p>Agricultural entrepreneurship presents unique challenges that differ from traditional business ventures. From unpredictable weather patterns to complex supply chains, agripreneurs must navigate a variety of obstacles to build successful enterprises.</p>
                
                <h2>Common Challenges in Agricultural Entrepreneurship</h2>
                
                <h3>1. Weather and Climate Uncertainty</h3>
                <p>Unlike many businesses that operate in controlled environments, agricultural ventures are directly impacted by weather conditions and climate change. Droughts, floods, and unexpected temperature fluctuations can devastate crops and livestock, threatening an agripreneur's livelihood.</p>
                
                <h3>2. Market Volatility</h3>
                <p>Agricultural markets are notoriously volatile, with prices fluctuating based on global supply and demand, trade policies, and consumer preferences. This unpredictability makes financial planning and profit forecasting particularly challenging.</p>
                
                <h3>3. Access to Capital</h3>
                <p>Many agricultural entrepreneurs struggle to secure adequate financing for their ventures. Traditional lenders often perceive agricultural businesses as high-risk investments due to the factors mentioned above, leading to higher interest rates or loan denials.</p>
                
                <h3>4. Supply Chain Complexities</h3>
                <p>Managing the agricultural supply chain—from production to processing, distribution, and retail—requires coordinating multiple stakeholders and processes. Inefficiencies at any stage can result in significant losses, especially for perishable products.</p>
                
                <h2>Strategies for Success</h2>
                
                <p>Despite these challenges, agricultural entrepreneurs can implement several strategies to increase their chances of success:</p>
                
                <h3>1. Diversification</h3>
                <p>Diversifying crops, products, or services can help mitigate risks associated with market volatility and climate uncertainty. By not "putting all eggs in one basket," agripreneurs can ensure that a failure in one area doesn't threaten the entire business.</p>
                
                <h3>2. Embrace Technology</h3>
                <p>Modern agricultural technologies, including precision farming tools, data analytics, and farm management software, can increase efficiency and productivity while reducing costs. These technologies allow for more precise resource management and better decision-making.</p>
                
                <h3>3. Build Strong Networks</h3>
                <p>Developing relationships with other farmers, suppliers, distributors, and industry experts creates a support system that can provide valuable insights, resources, and opportunities. Collaborative approaches, such as forming cooperatives or producer groups, can also enhance bargaining power in the marketplace.</p>
                
                <h3>4. Focus on Value Addition</h3>
                <p>Processing agricultural products to add value before selling them can significantly increase profit margins. This could involve simple processing (like cleaning and packaging), or more complex transformation (like making jams from fruits or flour from grains).</p>
                
                <h3>5. Develop a Strong Business Plan</h3>
                <p>A comprehensive business plan that accounts for the unique challenges of agricultural entrepreneurship is essential. This should include detailed market analysis, risk management strategies, and contingency plans for various scenarios.</p>
                
                <p>By implementing these strategies and maintaining resilience in the face of challenges, agricultural entrepreneurs can build sustainable, profitable businesses that contribute to food security and rural development.</p>
              `,
              category: 'agriculture',
              created_at: '2023-05-22T14:45:00Z',
              slug: 'overcoming-challenges-agricultural-entrepreneurship',
              reading_time: 9
            },
            {
              id: 3,
              title: 'Building Resilience: Mental Strength for Success',
              excerpt: 'Explore practical tips and techniques to build mental resilience that can help you overcome obstacles and achieve your goals.',
              content: `
                <p>Resilience—the ability to adapt and bounce back from adversity—is a crucial trait for success in any field, including agriculture. Mental strength doesn't just help us overcome challenges; it transforms them into opportunities for growth and learning.</p>
                
                <h2>Understanding Resilience</h2>
                
                <p>Resilience isn't about avoiding stress or hardship; it's about developing the mental and emotional tools to face difficulties head-on and emerge stronger. Resilient individuals don't simply endure challenges—they harness them as catalysts for personal and professional development.</p>
                
                <h2>Core Components of Mental Resilience</h2>
                
                <h3>1. Optimistic Mindset</h3>
                <p>Resilient people maintain a realistically optimistic outlook. They acknowledge difficulties but focus on possibilities rather than limitations. This doesn't mean ignoring problems, but rather approaching them with the belief that solutions exist and that they have the capacity to implement them.</p>
                
                <h3>2. Emotional Regulation</h3>
                <p>The ability to recognize, understand, and manage emotions is central to resilience. When faced with setbacks, resilient individuals allow themselves to experience negative emotions without being overwhelmed by them. They develop healthy coping mechanisms rather than suppressing feelings or resorting to destructive behaviors.</p>
                
                <h3>3. Strong Support Network</h3>
                <p>No one builds resilience in isolation. Maintaining meaningful connections with family, friends, mentors, and peers provides both emotional support during difficult times and diverse perspectives for problem-solving.</p>
                
                <h3>4. Adaptability</h3>
                <p>Resilient people remain flexible in their thinking and approaches. When one strategy doesn't work, they're willing to pivot and try different solutions, adapting their goals and methods based on changing circumstances.</p>
                
                <h2>Practical Techniques to Build Resilience</h2>
                
                <h3>1. Practice Mindfulness</h3>
                <p>Regular mindfulness meditation helps develop awareness of thoughts and emotions without judgment. This practice strengthens the ability to respond thoughtfully to challenges rather than reacting impulsively. Even just 5-10 minutes of daily meditation can yield significant benefits.</p>
                
                <h3>2. Reframe Negative Situations</h3>
                <p>When facing setbacks, consciously look for the potential benefits or lessons. Ask yourself: "What can I learn from this?" or "How might this challenge prepare me for future success?" This cognitive reframing transforms obstacles into stepping stones.</p>
                
                <h3>3. Set Achievable Goals</h3>
                <p>Break down larger ambitions into smaller, manageable objectives. Each small success builds confidence and motivation, creating momentum that carries you through more significant challenges.</p>
                
                <h3>4. Develop Problem-Solving Skills</h3>
                <p>Approach problems methodically by defining the issue, brainstorming multiple solutions, evaluating options, implementing the best approach, and reflecting on results. This structured process prevents feeling overwhelmed by complex challenges.</p>
                
                <h3>5. Practice Self-Compassion</h3>
                <p>Treat yourself with the same kindness and understanding you would offer a good friend. Self-compassion—rather than harsh self-criticism—facilitates learning from mistakes and maintaining motivation during difficult periods.</p>
                
                <h2>Applying Resilience in Daily Life</h2>
                
                <p>Building resilience is an ongoing process, not a destination. Incorporate these practices into your daily routine:</p>
                
                <ul>
                  <li>Begin each day by setting positive intentions</li>
                  <li>Regularly express gratitude for both successes and challenges</li>
                  <li>Celebrate progress, no matter how small</li>
                  <li>Schedule regular reflection time to process experiences and extract lessons</li>
                  <li>Prioritize physical well-being through adequate sleep, nutrition, and exercise</li>
                </ul>
                
                <p>Remember that resilience isn't about never falling; it's about rising every time you fall. With consistent practice of these techniques, you'll develop the mental strength to transform challenges into opportunities and setbacks into comebacks.</p>
              `,
              category: 'motivation',
              created_at: '2023-07-03T09:15:00Z',
              slug: 'building-resilience-mental-strength',
              reading_time: 10
            }
          ];

          const foundArticle = dummyArticles.find(article => article.slug === slug);
          
          if (foundArticle) {
            setArticle(foundArticle);
            
            // Set related articles (same category, excluding current article)
            const related = dummyArticles
              .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
              .slice(0, 3);
            setRelatedArticles(related);
          }
          
          setLoading(false);
        }, 500);

      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const getCategoryIcon = (category) => {
    return category === 'agriculture' ? (
      <FaLeaf className="text-primary" />
    ) : (
      <FaLightbulb className="text-yellow-500" />
    );
  };

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
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-gray-900 hover:text-gray-900/80 mb-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Articles
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2">
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{formatDate(article.created_at)}</span>
              </div>
              
              <div className="flex items-center">
                <FaFolder className="mr-2" />
                <span className="flex items-center">
                  {getCategoryIcon(article.category)}
                  <span className="ml-1 capitalize">{article.category}</span>
                </span>
              </div>
              
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{article.reading_time} min read</span>
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
                    <div className="h-40 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl opacity-30">{getCategoryIcon(relatedArticle.category)}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {getCategoryIcon(relatedArticle.category)}
                          <span className="ml-1 capitalize">{relatedArticle.category}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{relatedArticle.title}</h3>
                      <Link 
                        href={`/articles/${relatedArticle.slug}`}
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
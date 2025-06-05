import { FaLeaf, FaGraduationCap, FaAward, FaHandshake } from 'react-icons/fa';

export const metadata = {
  title: 'About Wallace Mukoka | Agronomist & Author',
  description: 'Learn about Wallace Mukoka, an agronomist and author passionate about educating people on agriculture and personal development.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Wallace Mukoka</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Agronomist, Author, and Educator dedicated to transforming lives through agriculture and personal development.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Biography</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Wallace Mukoka is a distinguished agronomist and author who holds a Bachelor&apos;s degree in Agronomy from Bindura University of Science and Engineering (BUSE) in Zimbabwe. His academic background has provided him with a strong foundation in agricultural science and sustainable farming practices.
              </p>
              <p>
                As an accomplished author, Wallace has published three influential books:
              </p>
              <ul>
                <li>&quot;Being Happy In A Sad World&quot; (May 2022)</li>
                <li>&quot;6 Surprising Ways To Get Happy&quot; (June 2023)</li>
                <li>&quot;Triumphs Through Time Management&quot; (September 2024)</li>
              </ul>
              <p>
                His writing combines practical wisdom with personal development insights, making complex concepts accessible to readers of all backgrounds. Through his books, Wallace shares his knowledge and experience to help others achieve personal growth and success.
              </p>
              <p>
                Wallace is passionate about education and regularly conducts workshops and training sessions for farmers and individuals seeking personal development. His mission is to empower people with the knowledge and skills they need to improve their lives and contribute to their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Sustainable Agriculture</h3>
              <p className="text-gray-600">
                Expertise in environmentally responsible farming methods that maintain soil health and biodiversity while maximizing productivity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Agricultural Education</h3>
              <p className="text-gray-600">
                Dedicated to teaching practical farming skills and knowledge to farmers of all levels, from smallholders to large-scale producers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Personal Development</h3>
              <p className="text-gray-600">
                Guiding individuals to develop mindsets and habits that lead to personal and professional growth and fulfillment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Agricultural Consulting</h3>
              <p className="text-gray-600">
                Providing expert advice to farms, organizations, and governments on improving agricultural practices and policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Mission</h2>
            <div className="text-xl text-gray-700 italic">
              &ldquo;My mission is to empower individuals through knowledge and skills in agriculture and personal development, helping them achieve sustainable livelihoods, food security, and personal fulfillment.&rdquo;
            </div>
            <div className="mt-8 text-right">
              <span className="font-semibold text-gray-900 text-xl">— Wallace Mukoka</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Interested in Working Together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking for consultation, a workshop, or a speaking engagement, I&apos;m here to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors shadow-md"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
} 
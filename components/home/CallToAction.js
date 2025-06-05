import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch with Wallace</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Interested in collaborations, consultations, or speaking engagements? Reach out today.
        </p>
        <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors shadow-md"
          >
            Contact Now
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 bg-transparent border-2 border-white font-semibold rounded-md hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
} 
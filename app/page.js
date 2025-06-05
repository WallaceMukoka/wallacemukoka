import Hero from '../components/home/Hero';
import FeaturedArticles from '../components/home/FeaturedArticles';
import FeaturedBooks from '../components/home/FeaturedBooks';



export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedArticles />
      <FeaturedBooks />
    </div>
  );
}

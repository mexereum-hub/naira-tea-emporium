import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const CategorySleep = () => {
  const sleepProducts = [
    {
      id: "1",
      name: "Chamomile Dream Tea",
      price: 2500,
      image: "/src/assets/hibiscus-tea.jpg",
      description: "Gentle chamomile blend for peaceful, restful sleep",
      rating: 4.8,
      reviews: 156,
      benefits: ["Sleep", "Calming", "Relaxation"],
      inStock: true,
      isBestseller: true
    },
    {
      id: "2",
      name: "Lavender Night Blend",
      price: 2800,
      image: "/src/assets/hero-tea-image.jpg",
      description: "Calming lavender tea to ease you into deep sleep",
      rating: 4.7,
      reviews: 134,
      benefits: ["Sleep", "Lavender", "Relaxation"],
      inStock: true
    },
    {
      id: "3",
      name: "Valerian Root Sleep Aid",
      price: 3200,
      image: "/src/assets/ginger-tea.jpg",
      description: "Traditional sleep remedy with natural valerian root",
      rating: 4.5,
      reviews: 89,
      benefits: ["Sleep", "Natural", "Traditional"],
      inStock: true,
      isNew: true
    },
    {
      id: "4",
      name: "Bedtime Herbal Blend",
      price: 2900,
      image: "/src/assets/turmeric-tea.jpg",
      description: "Soothing herbal mix designed for optimal sleep preparation",
      rating: 4.6,
      reviews: 101,
      benefits: ["Sleep", "Herbal", "Soothing"],
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Sleep Teas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unwind and prepare for restful sleep with our calming herbal blends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sleepProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategorySleep;
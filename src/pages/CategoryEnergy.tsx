import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const CategoryEnergy = () => {
  const energyProducts = [
    {
      id: "1",
      name: "Moringa Energy Boost",
      price: 3200,
      image: "/src/assets/moringa-tea.jpg",
      description: "Natural energy boost with nutrient-dense moringa leaves",
      rating: 4.7,
      reviews: 95,
      benefits: ["Energy", "Natural", "Nutritious"],
      inStock: true,
      isBestseller: true
    },
    {
      id: "2",
      name: "Ginger Vitality Blend",
      price: 2800,
      image: "/src/assets/ginger-tea.jpg",
      description: "Invigorating ginger blend for sustained energy throughout the day",
      rating: 4.5,
      reviews: 78,
      benefits: ["Energy", "Ginger", "Vitality"],
      inStock: true
    },
    {
      id: "3",
      name: "Green Tea Energy Mix",
      price: 3500,
      image: "/src/assets/hero-tea-image.jpg",
      description: "Premium green tea with natural caffeine for clean energy",
      rating: 4.6,
      reviews: 112,
      benefits: ["Energy", "Green Tea", "Caffeine"],
      inStock: true,
      isNew: true
    },
    {
      id: "4",
      name: "Spiced Energy Chai",
      price: 3000,
      image: "/src/assets/turmeric-tea.jpg",
      description: "Traditional spice blend to energize and warm your body",
      rating: 4.4,
      reviews: 67,
      benefits: ["Energy", "Spices", "Traditional"],
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Energy Blends</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Natural energy solutions to power through your day without the crash.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {energyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryEnergy;
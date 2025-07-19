import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Gifts = () => {
  const giftSets = [
    {
      id: "1",
      name: "Wellness Discovery Set",
      price: 8500,
      originalPrice: 10000,
      image: "/src/assets/hero-tea-image.jpg",
      description: "Complete wellness collection with 5 premium tea blends and brewing guide",
      rating: 4.9,
      reviews: 87,
      benefits: ["Gift Set", "Wellness", "Complete"],
      inStock: true,
      isBestseller: true
    },
    {
      id: "2",
      name: "Immunity Boost Gift Box",
      price: 6200,
      image: "/src/assets/turmeric-tea.jpg",
      description: "Perfect gift for health-conscious loved ones with immune-supporting teas",
      rating: 4.7,
      reviews: 64,
      benefits: ["Gift Set", "Immunity", "Health"],
      inStock: true
    },
    {
      id: "3",
      name: "Relaxation Ritual Set",
      price: 5800,
      image: "/src/assets/hibiscus-tea.jpg",
      description: "Calming tea collection for stress relief and better sleep",
      rating: 4.8,
      reviews: 71,
      benefits: ["Gift Set", "Relaxation", "Sleep"],
      inStock: true,
      isNew: true
    },
    {
      id: "4",
      name: "Spice Lover's Collection",
      price: 7500,
      image: "/src/assets/ginger-tea.jpg",
      description: "Curated selection of premium Nigerian spices with recipe cards",
      rating: 4.6,
      reviews: 53,
      benefits: ["Gift Set", "Spices", "Traditional"],
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Gift Sets</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share the gift of wellness with our beautifully curated tea and spice collections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {giftSets.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gifts;
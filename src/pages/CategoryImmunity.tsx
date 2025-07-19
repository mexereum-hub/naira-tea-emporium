import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const CategoryImmunity = () => {
  const immunityProducts = [
    {
      id: "1",
      name: "Turmeric Ginger Immunity Blend",
      price: 3500,
      originalPrice: 4000,
      image: "/src/assets/turmeric-tea.jpg",
      description: "Powerful anti-inflammatory blend to boost your immune system naturally",
      rating: 4.8,
      reviews: 127,
      benefits: ["Immunity", "Anti-inflammatory", "Antioxidant"],
      inStock: true,
      isBestseller: true
    },
    {
      id: "2",
      name: "Moringa Immune Support Tea",
      price: 2800,
      image: "/src/assets/moringa-tea.jpg",
      description: "Nutrient-rich moringa leaves packed with vitamins and antioxidants",
      rating: 4.6,
      reviews: 89,
      benefits: ["Immunity", "Vitamin C", "Energy"],
      inStock: true,
      isNew: true
    },
    {
      id: "3",
      name: "Echinacea Defense Blend",
      price: 3200,
      image: "/src/assets/ginger-tea.jpg",
      description: "Traditional immune-boosting herbs for year-round wellness",
      rating: 4.5,
      reviews: 64,
      benefits: ["Immunity", "Traditional", "Wellness"],
      inStock: true
    },
    {
      id: "4",
      name: "Vitamin C Citrus Spice Tea",
      price: 2900,
      image: "/src/assets/hibiscus-tea.jpg",
      description: "Citrus-infused herbal blend rich in natural vitamin C",
      rating: 4.7,
      reviews: 103,
      benefits: ["Vitamin C", "Immunity", "Citrus"],
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Immunity Teas & Spices</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strengthen your natural defenses with our specially curated collection of immune-boosting teas and spices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {immunityProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryImmunity;
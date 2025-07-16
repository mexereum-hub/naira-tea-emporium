import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import hibiscusImage from "@/assets/hibiscus-tea.jpg";
import moringaImage from "@/assets/moringa-tea.jpg";
import gingeerImage from "@/assets/ginger-tea.jpg";
import turmericImage from "@/assets/turmeric-tea.jpg";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: "1",
      name: "Hibiscus Flower Tea",
      description: "Rich in antioxidants and vitamin C, perfect for heart health and blood pressure management.",
      price: 2500,
      originalPrice: 3000,
      image: hibiscusImage,
      rating: 4.8,
      reviews: 324,
      benefits: ["Heart Health", "Blood Pressure", "Antioxidants"],
      inStock: true,
      isBestseller: true
    },
    {
      id: "2", 
      name: "Moringa Leaf Tea",
      description: "Nutrient-dense superfood tea packed with vitamins, minerals, and complete amino acids.",
      price: 3200,
      image: moringaImage,
      rating: 4.9,
      reviews: 198,
      benefits: ["Energy Boost", "Immunity", "Anti-inflammatory"],
      inStock: true,
      isNew: true
    },
    {
      id: "3",
      name: "Ginger Root Tea", 
      description: "Fresh Nigerian ginger for digestive health, nausea relief, and natural warming properties.",
      price: 2800,
      originalPrice: 3200,
      image: gingeerImage,
      rating: 4.7,
      reviews: 256,
      benefits: ["Digestion", "Nausea Relief", "Anti-inflammatory"],
      inStock: true
    },
    {
      id: "4",
      name: "Turmeric Golden Tea",
      description: "Anti-inflammatory golden spice blend for joint health and natural healing support.",
      price: 3500,
      image: turmericImage,
      rating: 4.6,
      reviews: 142,
      benefits: ["Joint Health", "Anti-inflammatory", "Healing"],
      inStock: false
    }
  ];

  return (
    <section className="py-16 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Premium Teas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular herbal blends, carefully selected for their exceptional 
            health benefits and authentic Nigerian flavors.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            View All Products
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
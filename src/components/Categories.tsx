import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Shield, Moon, Sparkles, Leaf } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      id: "immunity",
      name: "Immunity Boost",
      description: "Teas & spices to strengthen natural defenses",
      icon: Shield,
      count: 18,
      color: "bg-green-100 text-green-700",
      gradient: "from-green-50 to-green-100"
    },
    {
      id: "energy",
      name: "Energy & Vitality",
      description: "Natural energy boosters without crashes",
      icon: Zap,
      count: 14,
      color: "bg-orange-100 text-orange-700",
      gradient: "from-orange-50 to-orange-100"
    },
    {
      id: "heart",
      name: "Heart Health",
      description: "Support cardiovascular wellness naturally",
      icon: Heart,
      count: 22,
      color: "bg-red-100 text-red-700",
      gradient: "from-red-50 to-red-100"
    },
    {
      id: "culinary",
      name: "Culinary Spices",
      description: "Premium spices for cooking excellence",
      icon: Sparkles,
      count: 35,
      color: "bg-amber-100 text-amber-700",
      gradient: "from-amber-50 to-amber-100"
    },
    {
      id: "sleep",
      name: "Sleep & Relaxation",
      description: "Peaceful rest and calming blends",
      icon: Moon,
      count: 12,
      color: "bg-purple-100 text-purple-700",
      gradient: "from-purple-50 to-purple-100"
    },
    {
      id: "traditional",
      name: "Traditional Blends",
      description: "Ancient Nigerian tea & spice recipes",
      icon: Leaf,
      count: 25,
      color: "bg-emerald-100 text-emerald-700",
      gradient: "from-emerald-50 to-emerald-100"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop by <span className="bg-gradient-hero bg-clip-text text-transparent">Benefits & Purpose</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect tea or spice for your wellness goals and culinary needs. 
            Each product is crafted with traditional knowledge and modern quality standards.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className={`p-6 bg-gradient-to-br ${category.gradient} relative`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 20% 80%, currentColor 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl ${category.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 mb-4">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Product Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} products
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200"
                      >
                        Explore →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-hero rounded-2xl p-8 lg:p-12">
          <div className="max-w-2xl mx-auto text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Not sure which product is right for you?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Take our personalized quiz and discover your perfect tea or spice blend 
              based on your health goals, taste preferences, and culinary needs.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              Take Product Quiz
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
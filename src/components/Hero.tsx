import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, ArrowRight, Shield, Truck } from "lucide-react";
import heroImage from "@/assets/hero-tea-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-secondary/20 text-secondary font-medium px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              Premium Nigerian Herbs
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Discover the</span>{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Ancient Wisdom
              </span>{" "}
              <span className="text-foreground">of Nigerian Herbal Teas</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the healing power of traditional Nigerian herbs, carefully 
              blended for modern wellness. From immune support to stress relief, 
              discover your perfect cup of health.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-muted-foreground">4.9/5 from 2,400+ reviews</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="hero" className="group">
              Shop Premium Teas
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="hero">
              Learn About Benefits
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">100% Natural</p>
                <p className="text-xs text-muted-foreground">No artificial additives</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-secondary/10 p-2 rounded-lg">
                <Truck className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-sm">Fast Delivery</p>
                <p className="text-xs text-muted-foreground">2-3 days across Nigeria</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Sustainably Sourced</p>
                <p className="text-xs text-muted-foreground">Supporting local farmers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-warm">
            <img
              src={heroImage}
              alt="Premium Nigerian herbal tea collection with traditional brewing equipment"
              className="w-full h-[600px] object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -top-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-elegant">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Fresh from farm</span>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-elegant">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2000+</div>
              <div className="text-xs text-muted-foreground">Happy customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
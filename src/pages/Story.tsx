import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Our Story</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ancient Nigerian traditions to modern wellness, discover the journey that inspired Sue&Mon.
            </p>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">The Beginning</h2>
                <p className="text-muted-foreground mb-4">
                  Sue&Mon was born from a deep appreciation for Nigerian herbal traditions and a passion for natural wellness. 
                  Our founders, inspired by generations of traditional knowledge, set out to bring authentic Nigerian teas and 
                  spices to the modern world.
                </p>
                <p className="text-muted-foreground">
                  What started as a small family business has grown into a trusted source for premium herbal blends, 
                  each carefully selected and prepared to honor traditional methods while meeting contemporary quality standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  We believe that wellness should be accessible, natural, and deeply rooted in tradition. Every tea and spice 
                  we offer is sourced directly from trusted Nigerian farmers who share our commitment to quality and sustainability.
                </p>
                <p className="text-muted-foreground">
                  Our mission is to bridge the gap between ancient wisdom and modern living, bringing you products that nourish 
                  both body and soul while supporting local communities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Quality Promise</h2>
                <p className="text-muted-foreground">
                  Every product in our collection undergoes rigorous quality testing and is prepared in small batches to ensure 
                  maximum freshness and potency. We're committed to providing you with the purest, most effective natural products 
                  available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
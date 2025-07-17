import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Zap, Shield } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Our hibiscus and green tea blends support cardiovascular wellness and help maintain healthy blood pressure.",
      teas: ["Hibiscus Tea", "Green Tea Blend", "Hawthorn Berry Tea"]
    },
    {
      icon: Brain,
      title: "Mental Clarity",
      description: "Ginkgo biloba and ginseng teas enhance cognitive function and improve focus throughout the day.",
      teas: ["Ginkgo Tea", "Ginseng Blend", "Memory Boost Tea"]
    },
    {
      icon: Zap,
      title: "Energy & Vitality",
      description: "Natural energy boosters like moringa and yerba mate provide sustained energy without caffeine crashes.",
      teas: ["Moringa Tea", "Energy Blend", "Vitality Mix"]
    },
    {
      icon: Shield,
      title: "Immune Support",
      description: "Turmeric, ginger, and echinacea blends strengthen your immune system naturally.",
      teas: ["Turmeric Ginger Tea", "Immunity Blend", "Wellness Tea"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Health Benefits</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful health benefits of our premium herbal tea blends, carefully selected for their therapeutic properties.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="group hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-hero p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {benefit.description}
                    </CardDescription>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Recommended Teas:</h4>
                      <ul className="space-y-1">
                        {benefit.teas.map((tea, teaIndex) => (
                          <li key={teaIndex} className="text-muted-foreground">• {tea}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Benefits;
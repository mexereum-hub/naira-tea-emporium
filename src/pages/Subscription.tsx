import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Gift, Truck, Calendar } from "lucide-react";

const Subscription = () => {
  const plans = [
    {
      name: "Starter Plan",
      price: "₦8,500",
      period: "per month",
      description: "Perfect for tea beginners",
      features: [
        "3 different tea blends (50g each)",
        "Monthly wellness guide",
        "Free shipping",
        "Cancel anytime"
      ],
      popular: false
    },
    {
      name: "Explorer Plan", 
      price: "₦14,000",
      period: "per month",
      description: "For the curious tea enthusiast",
      features: [
        "5 different tea blends (50g each)",
        "Exclusive seasonal blends",
        "Monthly wellness guide",
        "Tea brewing accessories",
        "Free shipping",
        "Cancel anytime"
      ],
      popular: true
    },
    {
      name: "Connoisseur Plan",
      price: "₦22,000", 
      period: "per month",
      description: "For the ultimate tea lover",
      features: [
        "8 different tea blends (50g each)",
        "Premium exclusive blends",
        "Monthly wellness guide",
        "Premium brewing accessories",
        "Personal tea consultation",
        "Free shipping",
        "Cancel anytime"
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Gift,
      title: "Curated Selection",
      description: "Hand-picked premium blends delivered to your door"
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on all subscription orders"
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Pause, skip, or cancel your subscription anytime"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Tea Subscription</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get premium herbal tea blends delivered monthly. Discover new flavors and enjoy the convenience of automatic delivery.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-elegant' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-secondary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;
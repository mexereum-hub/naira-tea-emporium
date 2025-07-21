import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Shield } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Shipping Information</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fast, reliable delivery of your premium herbal teas. Learn about our shipping options and policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">2-5 business days within Nigeria</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Same Day Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Orders placed before 2 PM ship same day</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Nationwide Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We deliver to all 36 states in Nigeria</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Secure Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your teas arrive fresh and protected</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h4 className="font-medium">Lagos State</h4>
                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                    </div>
                    <span className="font-medium">₦1,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h4 className="font-medium">Abuja & Surrounding Areas</h4>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                    </div>
                    <span className="font-medium">₦2,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h4 className="font-medium">Other Major Cities</h4>
                      <p className="text-sm text-muted-foreground">3-4 business days</p>
                    </div>
                    <span className="font-medium">₦2,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Remote Areas</h4>
                      <p className="text-sm text-muted-foreground">4-5 business days</p>
                    </div>
                    <span className="font-medium">₦3,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Free Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Orders over ₦15,000</h4>
                  <p className="text-sm text-muted-foreground">
                    Enjoy free standard shipping on all orders above ₦15,000 within Nigeria.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Subscription Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    All subscription orders include free shipping regardless of order value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Processing Time</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Orders placed before 2:00 PM are processed same day</li>
                    <li>• Orders placed after 2:00 PM are processed next business day</li>
                    <li>• Weekend orders are processed on Monday</li>
                    <li>• No processing on public holidays</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Delivery Information</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tracking number provided via email and SMS</li>
                    <li>• Signature required for delivery</li>
                    <li>• Delivery attempts made during business hours</li>
                    <li>• Re-delivery can be scheduled if missed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
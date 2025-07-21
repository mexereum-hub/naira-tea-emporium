import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Users, Package, TrendingUp } from "lucide-react";

const Wholesale = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Wholesale Program</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Partner with us to bring premium herbal teas to your customers. Join our wholesale program for special pricing and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Building className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Business Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Retail stores, cafes, and wellness centers</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Dedicated Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Personal account manager and marketing support</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Package className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Bulk Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Competitive wholesale rates and volume discounts</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Growth Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Marketing materials and business development</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Wholesale Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input id="contact" placeholder="Your name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Input id="business-type" placeholder="e.g., Retail store, Cafe, Wellness center" />
                </div>
                <div>
                  <Label htmlFor="message">Tell us about your business</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your business, expected order volume, and any specific requirements"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Wholesale Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wholesale;
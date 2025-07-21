import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, CheckCircle, AlertCircle, Clock } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Returns & Refunds</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We want you to love your tea! If you're not completely satisfied, we're here to help with returns and refunds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>30-Day Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Returns accepted within 30 days of purchase</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">100% satisfaction guarantee on all products</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <RotateCcw className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Easy Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Simple return process with prepaid labels</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Return Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Eligible Items</h4>
                    <p className="text-muted-foreground text-sm">All unopened tea products in original packaging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Condition</h4>
                    <p className="text-muted-foreground text-sm">Items must be in new, unused condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Exceptions</h4>
                    <p className="text-muted-foreground text-sm">Opened tea products cannot be returned for hygiene reasons</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Refund Timeline</h4>
                    <p className="text-muted-foreground text-sm">Refunds processed within 5-7 business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Start a Return</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="order-number">Order Number</Label>
                    <Input id="order-number" placeholder="Enter your order number" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason for Return</Label>
                    <select id="reason" className="w-full p-2 border border-input rounded-md bg-background">
                      <option value="">Select a reason</option>
                      <option value="defective">Defective/Damaged Item</option>
                      <option value="wrong-item">Wrong Item Received</option>
                      <option value="not-as-described">Not as Described</option>
                      <option value="quality">Quality Issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="details">Additional Details</Label>
                    <Textarea 
                      id="details" 
                      placeholder="Please provide any additional details about your return"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Return Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
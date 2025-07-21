import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Search, Truck, MapPin } from "lucide-react";
import { useState } from "react";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    // Tracking functionality would be implemented here
    console.log("Tracking order:", trackingNumber);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Track Your Order</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your tracking number below to get real-time updates on your tea delivery.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Track Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    placeholder="Enter your tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <Button onClick={handleTrack} className="w-full">
                  Track Order
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Package className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Order Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your order has been received and is being prepared</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>In Transit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your package is on its way to you</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Delivered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your order has been delivered successfully</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Track;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Customer Support</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Get in touch with our customer care team for any questions or concerns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <HelpCircle className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Find answers to common questions</p>
                <Button variant="outline" size="sm">View FAQ</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MessageCircle className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Chat with our support team</p>
                <Button variant="outline" size="sm">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">+234 800 TEA SHOP</p>
                <Button variant="outline" size="sm">Call Now</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">hello@suemon.ng</p>
                <Button variant="outline" size="sm">Send Email</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-muted-foreground">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-muted-foreground">24/7 - We respond within 24 hours</p>
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

export default Support;
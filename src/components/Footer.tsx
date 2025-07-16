import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube,
  ShieldCheck,
  Truck,
  RefreshCcw
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Tea Benefits", href: "/benefits" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" }
  ];

  const shopLinks = [
    { name: "All Products", href: "/shop" },
    { name: "Immunity Teas", href: "/category/immunity" },
    { name: "Energy Blends", href: "/category/energy" },
    { name: "Sleep Teas", href: "/category/sleep" },
    { name: "Gift Sets", href: "/gifts" },
    { name: "Subscription", href: "/subscription" }
  ];

  const supportLinks = [
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/sizing" },
    { name: "Track Order", href: "/track" },
    { name: "Customer Care", href: "/support" },
    { name: "Wholesale", href: "/wholesale" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-glow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-primary-foreground/80">
                Get exclusive offers, brewing tips, and health insights delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-primary-foreground/10 border-primary-glow/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="lg" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-primary-glow p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Naira Tea Emporium</h2>
                <p className="text-sm text-primary-foreground/80">Premium Herbal Blends</p>
              </div>
            </Link>
            
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Bringing you the finest Nigerian herbal teas, sustainably sourced and 
              traditionally prepared for modern wellness. Every cup tells a story of 
              health, heritage, and harmony.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-primary-foreground/80">100% Natural</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-primary-foreground/80">Fast Delivery</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-primary-foreground/80">Easy Returns</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-secondary hover:bg-primary-glow/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-secondary hover:bg-primary-glow/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-secondary hover:bg-primary-glow/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-secondary hover:bg-primary-glow/20">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">+234 800 TEA SHOP</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">hello@nairatea.ng</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-glow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Naira Tea Emporium. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
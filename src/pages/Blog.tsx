import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Ancient Wisdom of Nigerian Herbal Teas",
      excerpt: "Discover the traditional healing properties of indigenous Nigerian herbs and how they've been used for centuries to promote wellness.",
      author: "Dr. Amara Okafor",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Traditional Medicine",
      image: "/placeholder.svg"
    },
    {
      title: "How to Brew the Perfect Cup of Moringa Tea", 
      excerpt: "Learn the optimal brewing techniques to extract maximum nutrients and flavor from moringa leaves.",
      author: "Chef Kemi Adebayo",
      date: "March 12, 2024", 
      readTime: "3 min read",
      category: "Brewing Guide",
      image: "/placeholder.svg"
    },
    {
      title: "Hibiscus Tea: Nature's Heart Health Protector",
      excerpt: "Scientific research reveals how hibiscus tea can naturally support cardiovascular health and manage blood pressure.",
      author: "Dr. Ibrahim Yusuf",
      date: "March 10, 2024",
      readTime: "7 min read", 
      category: "Health Benefits",
      image: "/placeholder.svg"
    },
    {
      title: "Building Your Daily Tea Ritual for Wellness",
      excerpt: "Create a mindful tea practice that supports your physical and mental well-being throughout the day.",
      author: "Wellness Coach Fatima",
      date: "March 8, 2024",
      readTime: "4 min read",
      category: "Lifestyle",
      image: "/placeholder.svg"
    },
    {
      title: "Turmeric Tea: The Golden Healer",
      excerpt: "Explore the anti-inflammatory benefits of turmeric tea and discover delicious ways to incorporate it into your routine.",
      author: "Nutritionist Bola Ade",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Health Benefits", 
      image: "/placeholder.svg"
    },
    {
      title: "Sustainable Tea Farming in Nigeria",
      excerpt: "Meet the local farmers who are growing premium herbs using sustainable, eco-friendly practices.",
      author: "Environmental Writer Chidi",
      date: "March 3, 2024",
      readTime: "8 min read",
      category: "Sustainability",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Health Benefits", "Brewing Guide", "Traditional Medicine", "Lifestyle", "Sustainability"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Tea Wisdom Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the fascinating world of herbal teas through expert insights, brewing guides, and wellness tips.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant={index === 0 ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <span>{post.date}</span>
                  </div>
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

export default Blog;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBlogPosts(data || []);
      
      // Extract unique categories
      const uniqueCategories = ["All", ...new Set(data?.map(post => post.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-elegant transition-all duration-300 cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden">
                    <img 
                      src={post.image_url || "/placeholder.svg"} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        5 min read
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
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
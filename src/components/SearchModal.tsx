import { useState, useEffect } from 'react';
import { useSearch } from '@/contexts/SearchContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star } from 'lucide-react';
import hibiscusImage from "@/assets/hibiscus-tea.jpg";
import moringaImage from "@/assets/moringa-tea.jpg";
import gingerImage from "@/assets/ginger-tea.jpg";
import turmericImage from "@/assets/turmeric-tea.jpg";

const SearchModal = () => {
  const { isOpen, setIsOpen, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState<any[]>([]);

  // Mock product data
  const allProducts = [
    {
      id: "1",
      name: "Hibiscus Flower Tea",
      description: "Rich in antioxidants and vitamin C, perfect for heart health and blood pressure management.",
      price: 2500,
      originalPrice: 3000,
      image: hibiscusImage,
      rating: 4.8,
      reviews: 324,
      benefits: ["Heart Health", "Blood Pressure", "Antioxidants"],
      inStock: true,
      isBestseller: true
    },
    {
      id: "2", 
      name: "Moringa Leaf Tea",
      description: "Nutrient-dense superfood tea packed with vitamins, minerals, and complete amino acids.",
      price: 3200,
      image: moringaImage,
      rating: 4.9,
      reviews: 198,
      benefits: ["Energy Boost", "Immunity", "Anti-inflammatory"],
      inStock: true,
      isNew: true
    },
    {
      id: "3",
      name: "Ginger Root Tea", 
      description: "Fresh Nigerian ginger for digestive health, nausea relief, and natural warming properties.",
      price: 2800,
      originalPrice: 3200,
      image: gingerImage,
      rating: 4.7,
      reviews: 256,
      benefits: ["Digestion", "Nausea Relief", "Anti-inflammatory"],
      inStock: true
    },
    {
      id: "4",
      name: "Turmeric Golden Tea",
      description: "Anti-inflammatory golden spice blend for joint health and natural healing support.",
      price: 3500,
      image: turmericImage,
      rating: 4.6,
      reviews: 142,
      benefits: ["Joint Health", "Anti-inflammatory", "Healing"],
      inStock: false
    }
  ];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.benefits.some(benefit => 
        benefit.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setResults(filtered);
  }, [searchQuery]);

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search Products</span>
          </DialogTitle>
          <DialogDescription>
            Find your perfect herbal tea blend
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for teas, benefits, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="overflow-y-auto max-h-96 space-y-3">
            {!searchQuery.trim() ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Start typing to search our premium tea collection
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Hibiscus", "Moringa", "Ginger", "Turmeric", "Heart Health", "Digestion"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No products found for "{searchQuery}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try searching for different keywords or browse our categories
                </p>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  className="flex space-x-4 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={handleClose}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{product.name}</h4>
                      <span className="font-semibold text-primary">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {product.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
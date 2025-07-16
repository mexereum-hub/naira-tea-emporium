import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  benefits: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group overflow-hidden cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <Badge className="bg-secondary text-secondary-foreground">New</Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 ${
            isWishlisted ? 'text-red-500' : 'text-muted-foreground'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Actions */}
        <div className={`absolute bottom-3 left-3 right-3 transform transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1 bg-background/90 backdrop-blur-sm hover:bg-background"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              className="flex-1"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="outline" className="text-muted-foreground">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-accent/20 border-accent/40"
            >
              {benefit}
            </Badge>
          ))}
          {product.benefits.length > 2 && (
            <Badge 
              variant="outline" 
              className="text-xs bg-muted/50 border-muted"
            >
              +{product.benefits.length - 2} more
            </Badge>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.floor(product.rating)
                    ? 'fill-secondary text-secondary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Price */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-lg font-bold text-primary">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
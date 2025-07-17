import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import PaystackCheckout from './PaystackCheckout';

const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    clearCart 
  } = useCart();

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopping Cart</span>
            </SheetTitle>
            <SheetDescription>
              Your cart is currently empty
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              Your shopping cart is empty.<br />
              Add some premium herbal teas to get started!
            </p>
            <Button onClick={() => setIsOpen(false)} variant="hero">
              Continue Shopping
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopping Cart</span>
              <Badge variant="secondary">{items.length}</Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          </SheetTitle>
          <SheetDescription>
            Review your items before checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {items.map((item) => (
            <div key={item.id} className="flex space-x-4 p-4 bg-card rounded-lg border">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                <p className="text-sm font-semibold text-primary">
                  ₦{item.price.toLocaleString()}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <p className="text-sm font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-primary">
              ₦{getTotalPrice().toLocaleString()}
            </span>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <PaystackCheckout />
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
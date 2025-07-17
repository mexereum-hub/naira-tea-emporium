import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PaystackButton } from 'react-paystack';
import { CreditCard, Lock } from 'lucide-react';

const PaystackCheckout = () => {
  const { getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Replace with your actual Paystack public key
  const publicKey = "pk_test_your_paystack_public_key_here";

  const amount = getTotalPrice() * 100; // Paystack expects amount in kobo

  const componentProps = {
    email,
    amount,
    currency: 'NGN',
    publicKey: publicKey,
    text: `Pay ₦${getTotalPrice().toLocaleString()}`,
    onSuccess: (reference: any) => {
      toast({
        title: "Payment Successful!",
        description: `Transaction reference: ${reference.reference}`,
      });
      clearCart();
      // Here you would typically send the transaction details to your backend
      console.log('Payment successful:', reference);
    },
    onClose: () => {
      toast({
        title: "Payment Cancelled",
        description: "Your payment was cancelled",
        variant: "destructive",
      });
    },
  };

  const isFormValid = email && name && phone && email.includes('@');

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Secured by Paystack
          </span>
        </div>

        {isFormValid ? (
          <PaystackButton
            {...componentProps}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <CreditCard className="h-4 w-4" />
            <span>Pay ₦{getTotalPrice().toLocaleString()}</span>
          </PaystackButton>
        ) : (
          <Button 
            disabled 
            className="w-full"
            variant="hero"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Complete form to continue
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        By proceeding, you agree to our Terms of Service and Privacy Policy.
        Your payment is processed securely through Paystack.
      </p>
    </div>
  );
};

export default PaystackCheckout;
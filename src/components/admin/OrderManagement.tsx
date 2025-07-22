import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface Order {
  id: string;
  user_id?: string;
  email: string;
  phone?: string;
  first_name: string;
  last_name: string;
  shipping_address: any;
  billing_address?: any;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_reference?: string;
  tracking_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface OrderManagementProps {
  orders: Order[];
  ordersLoading: boolean;
  onRefresh: () => void;
}

export const OrderManagement = ({ orders, ordersLoading, onRefresh }: OrderManagementProps) => {
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpdateOrder = async (orderId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order updated successfully"
      });

      setEditingOrder(null);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'shipped': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        {ordersLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-l-4 border-l-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {order.first_name} {order.last_name} • {order.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()} • 
                        ₦{order.total_amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge variant={getPaymentStatusBadgeVariant(order.payment_status)}>
                        {order.payment_status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingOrder(editingOrder === order.id ? null : order.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {editingOrder === order.id && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Order Status</label>
                        <Select 
                          defaultValue={order.status}
                          onValueChange={(value) => {
                            const statusSelect = document.getElementById(`status-${order.id}`) as HTMLSelectElement;
                            if (statusSelect) statusSelect.value = value;
                          }}
                        >
                          <SelectTrigger id={`status-${order.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Payment Status</label>
                        <Select 
                          defaultValue={order.payment_status}
                          onValueChange={(value) => {
                            const paymentSelect = document.getElementById(`payment-${order.id}`) as HTMLSelectElement;
                            if (paymentSelect) paymentSelect.value = value;
                          }}
                        >
                          <SelectTrigger id={`payment-${order.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tracking Number</label>
                      <input
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue={order.tracking_number || ""}
                        id={`tracking-${order.id}`}
                        placeholder="Enter tracking number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea
                        defaultValue={order.notes || ""}
                        id={`notes-${order.id}`}
                        placeholder="Order notes"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Shipping Address</label>
                      <div className="p-3 bg-muted rounded-md text-sm">
                        {JSON.stringify(order.shipping_address, null, 2)}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        const statusSelect = document.getElementById(`status-${order.id}`) as HTMLSelectElement;
                        const paymentSelect = document.getElementById(`payment-${order.id}`) as HTMLSelectElement;
                        const trackingInput = document.getElementById(`tracking-${order.id}`) as HTMLInputElement;
                        const notesInput = document.getElementById(`notes-${order.id}`) as HTMLTextAreaElement;
                        
                        handleUpdateOrder(order.id, {
                          status: statusSelect?.value || order.status,
                          payment_status: paymentSelect?.value || order.payment_status,
                          tracking_number: trackingInput?.value || null,
                          notes: notesInput?.value || null
                        });
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update Order
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
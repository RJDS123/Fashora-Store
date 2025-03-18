import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI } from '../services/api';
import { format } from 'date-fns';

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getUserOrders();
        setOrders(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Loading orders...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">No orders found</h1>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h2>
                <p className="text-sm text-gray-600">
                  Placed on {format(new Date(order.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Product ID: {item.product}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                      {item.size && ` | Size: ${item.size}`}
                      {item.color && ` | Color: ${item.color}`}
                    </p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>${order.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p>${order.shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 
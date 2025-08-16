import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice, getItemCount } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (kittenId: number, kittenName: string) => {
    console.log('Removing item from cart:', kittenName);
    removeFromCart(kittenId);
    toast({
      title: "Gatito removido",
      description: `${kittenName} ha sido removido del carrito.`,
    });
  };

  const handleCheckout = () => {
    console.log('Processing checkout for items:', cartItems);
    toast({
      title: "¡Adopción iniciada!",
      description: "Nos pondremos en contacto contigo pronto para completar la adopción.",
    });
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-purple-600">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Adopción ({getItemCount()})
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400 mt-1">¡Agrega algunos gatitos adorables!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.kitten.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.kitten.image}
                    alt={item.kitten.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.kitten.name}</h4>
                    <p className="text-sm text-gray-600">{item.kitten.breed}</p>
                    <p className="text-sm font-medium text-purple-600">${item.kitten.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.kitten.id, item.kitten.name)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-purple-600">${getTotalPrice()}</span>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Proceder con la Adopción
              </Button>
              <Button
                onClick={clearCart}
                variant="outline"
                className="w-full"
              >
                Vaciar Carrito
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
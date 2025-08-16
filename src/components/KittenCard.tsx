import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface KittenCardProps {
  kitten: Kitten;
}

const KittenCard: React.FC<KittenCardProps> = ({ kitten }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    console.log('Adding kitten to cart:', kitten.name);
    addToCart(kitten);
    toast({
      title: "¡Gatito agregado!",
      description: `${kitten.name} ha sido agregado al carrito.`,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={kitten.image}
            alt={kitten.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white/90 text-red-500 hover:text-red-600"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          {kitten.vaccinated && (
            <Badge className="absolute top-2 left-2 bg-green-500">
              Vacunado
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{kitten.name}</h3>
          <span className="text-xl font-bold text-purple-600">${kitten.price}</span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p><span className="font-medium">Raza:</span> {kitten.breed}</p>
          <p><span className="font-medium">Edad:</span> {kitten.age}</p>
          <p><span className="font-medium">Género:</span> {kitten.gender === 'male' ? 'Macho' : 'Hembra'}</p>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2">{kitten.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          disabled={!kitten.available}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {kitten.available ? 'Adoptar' : 'No disponible'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KittenCard;
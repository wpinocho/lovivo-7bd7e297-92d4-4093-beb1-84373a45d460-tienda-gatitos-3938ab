import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface KittenFiltersProps {
  selectedBreed: string;
  selectedGender: string;
  selectedAge: string;
  onBreedChange: (breed: string) => void;
  onGenderChange: (gender: string) => void;
  onAgeChange: (age: string) => void;
  onClearFilters: () => void;
}

const KittenFilters: React.FC<KittenFiltersProps> = ({
  selectedBreed,
  selectedGender,
  selectedAge,
  onBreedChange,
  onGenderChange,
  onAgeChange,
  onClearFilters
}) => {
  const breeds = ['Persa', 'Maine Coon', 'Siamés', 'Británico de Pelo Corto', 'Ragdoll', 'Bengalí'];
  const ages = ['2 meses', '3 meses', '4 meses', '5 meses'];

  const hasActiveFilters = selectedBreed !== 'all' || selectedGender !== 'all' || selectedAge !== 'all';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <h3 className="font-semibold text-gray-900">Filtros:</h3>
        
        <Select value={selectedBreed} onValueChange={onBreedChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Todas las razas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las razas</SelectItem>
            {breeds.map(breed => (
              <SelectItem key={breed} value={breed}>{breed}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedGender} onValueChange={onGenderChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="male">Macho</SelectItem>
            <SelectItem value="female">Hembra</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedAge} onValueChange={onAgeChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Edad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {ages.map(age => (
              <SelectItem key={age} value={age}>{age}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="text-sm"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedBreed !== 'all' && (
            <Badge variant="secondary">Raza: {selectedBreed}</Badge>
          )}
          {selectedGender !== 'all' && (
            <Badge variant="secondary">
              Género: {selectedGender === 'male' ? 'Macho' : 'Hembra'}
            </Badge>
          )}
          {selectedAge !== 'all' && (
            <Badge variant="secondary">Edad: {selectedAge}</Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default KittenFilters;
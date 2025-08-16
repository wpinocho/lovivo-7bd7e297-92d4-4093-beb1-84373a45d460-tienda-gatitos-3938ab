import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import KittenCard from '../components/KittenCard';
import KittenFilters from '../components/KittenFilters';
import { kittens } from '../data/kittens';
import { Kitten } from '../types/kitten';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  console.log('Rendering Index page with filters:', {
    searchTerm,
    selectedBreed,
    selectedGender,
    selectedAge
  });

  const filteredKittens = useMemo(() => {
    return kittens.filter((kitten: Kitten) => {
      const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.breed.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreed = selectedBreed === 'all' || kitten.breed === selectedBreed;
      const matchesGender = selectedGender === 'all' || kitten.gender === selectedGender;
      const matchesAge = selectedAge === 'all' || kitten.age === selectedAge;

      return matchesSearch && matchesBreed && matchesGender && matchesAge;
    });
  }, [searchTerm, selectedBreed, selectedGender, selectedAge]);

  const handleClearFilters = () => {
    console.log('Clearing all filters');
    setSelectedBreed('all');
    setSelectedGender('all');
    setSelectedAge('all');
    setSearchTerm('');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🐱 Encuentra tu Compañero Perfecto
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre gatitos adorables esperando un hogar lleno de amor. 
              Cada adopción incluye vacunas, desparasitación y mucho cariño.
            </p>
          </div>

          {/* Filters */}
          <KittenFilters
            selectedBreed={selectedBreed}
            selectedGender={selectedGender}
            selectedAge={selectedAge}
            onBreedChange={setSelectedBreed}
            onGenderChange={setSelectedGender}
            onAgeChange={setSelectedAge}
            onClearFilters={handleClearFilters}
          />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredKittens.length === 0 
                ? 'No se encontraron gatitos con estos filtros' 
                : `Mostrando ${filteredKittens.length} gatito${filteredKittens.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {/* Kittens Grid */}
          {filteredKittens.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKittens.map((kitten) => (
                <KittenCard key={kitten.id} kitten={kitten} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😿</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No encontramos gatitos
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar tus filtros o buscar algo diferente
              </p>
              <button
                onClick={handleClearFilters}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="font-semibold text-gray-900 mb-2">Salud Garantizada</h3>
                <p className="text-gray-600">Todos nuestros gatitos están vacunados y desparasitados</p>
              </div>
              <div>
                <div className="text-3xl mb-3">❤️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Amor Incondicional</h3>
                <p className="text-gray-600">Gatitos criados con mucho amor y cuidado</p>
              </div>
              <div>
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-semibold text-gray-900 mb-2">Soporte Continuo</h3>
                <p className="text-gray-600">Te acompañamos en todo el proceso de adopción</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2024 GatiTienda - Conectando corazones con patitas 🐾
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;
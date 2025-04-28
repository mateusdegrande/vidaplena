import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { UserForm } from './components/UserForm';
import { About } from './pages/About';
import { Accessibility } from './pages/Accessibility';
import { ContactForm } from './components/ContactForm';
import { products } from './data/products';

function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filtra produtos com base na pesquisa e categoria
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Renderiza o conteúdo com base no caminho
  const renderContent = () => {
    switch (window.location.pathname) {
      case '/carrinho':
        return <Cart />;
      case '/conta':
        return <UserForm />;
      case '/sobre':
        return <About />;
      case '/acessibilidade':
        return <Accessibility />;
      default:
        return (
          <>
            <section aria-labelledby="featured-heading">
              <h2 
                id="featured-heading" 
                className="text-3xl font-bold text-slate-900 dark:text-white mb-8"
              >
                {selectedCategory ? 
                  `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 
                  'Produtos em Destaque'}
              </h2>
              <ProductGrid products={filteredProducts} />
            </section>

            <section className="mt-16 bg-rose-50 dark:bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Compromisso com Acessibilidade
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Nossa loja foi desenvolvida pensando no seu conforto e bem-estar. Oferecemos:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Modo de alto contraste e tema escuro</li>
                <li>• Tamanho de texto ajustável</li>
                <li>• Navegação simplificada</li>
                <li>• Compatibilidade com leitores de tela</li>
                <li>• Fontes claras e legíveis</li>
              </ul>
            </section>
          </>
        );
    }
  };

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header 
          onSearch={setSearchQuery} 
          searchQuery={searchQuery}
        />
        <Navigation 
          onCategorySelect={setSelectedCategory} 
          selectedCategory={selectedCategory}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>

        <footer className="bg-slate-100 dark:bg-slate-800 mt-16 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Fale Conosco
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Telefone: 0800-123-4567</li>
                  <li>Email: contato@vidaplena.com.br</li>
                  <li>Chat: Disponível 24/7</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Links Úteis
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/sobre" className="text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400">
                      Sobre Nós
                    </a>
                  </li>
                  <li>
                    <a href="/acessibilidade" className="text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400">
                      Política de Acessibilidade
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Atendimento ao Cliente
                </h3>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  aria-label="Iniciar chat ao vivo"
                >
                  Iniciar Chat
                </button>
              </div>
            </div>
          </div>
        </footer>

        {showContactForm && (
          <ContactForm onClose={() => setShowContactForm(false)} />
        )}
      </div>
    </AccessibilityProvider>
  );
}

export default App;
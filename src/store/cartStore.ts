import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore, Product, CartItem } from '../types';

// Store do carrinho usando Zustand com persistência
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Adiciona um item ao carrinho
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Se o item já existe, incrementa a quantidade
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          // Se é um novo item, adiciona com quantidade 1
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        });
      },
      
      // Remove um item do carrinho
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },
      
      // Atualiza a quantidade de um item
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          // Se a quantidade é 0 ou menor, remove o item
          if (quantity <= 0) {
            return {
              items: state.items.filter(item => item.id !== productId),
            };
          }

          // Caso contrário, atualiza a quantidade
          return {
            items: state.items.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },
      
      // Limpa o carrinho
      clearCart: () => set({ items: [] }),
      
      // Calcula o total do carrinho
      get total() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      // Retorna o número total de itens no carrinho
      get itemCount() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // nome para o localStorage
      skipHydration: false, // garante que os dados sejam carregados imediatamente
    }
  )
);
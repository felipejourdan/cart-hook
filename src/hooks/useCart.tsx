import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { Product, Stock } from '../types'

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    // const storagedCart = Buscar dados do localStorage
    // if (storagedCart) {
    //   return JSON.parse(storagedCart);
    // }

    return []
  })

  const addProduct = async (productId: number) => {
    try {
      const updateProduct = cart.map(product =>
        product.id === productId
          ? { ...product, amount: product.amount + 1 }
          : product
      )
      setCart(updateProduct)
      console.log('parando no try')
    } catch {
      const { data } = await api.get('products')
      const newProductOnCart = data.find(
        (product: Product) => product.id === productId
      )

      newProductOnCart['amount'] = 1

      setCart([...cart, newProductOnCart])
    }
  }

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  }

  const updateProductAmount = async ({
    productId,
    amount
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}

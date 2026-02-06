import Header from "@/components/Header"
import ProductGrid from "@/components/ProductGrid"
import CartSheet from "@/components/CardSheet"

export default function App() {
  return (
    <>
      <Header />
      <main className="p-6">
        <ProductGrid />
      </main>
      <CartSheet />
    </>
  )
}

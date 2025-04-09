import React from "react";
import Navbar from "../components/Navbar";

export default function Cart({
  searchUtility,
  cartUtility,
  categoriesUtility,
}) {
  const { cart, removeFromCart, clearCart } = cartUtility;
  const { categories } = categoriesUtility;
  return (
    <main className="flex flex-col h-screen">
      <Navbar searchUtility={searchUtility} />
    <section className={`flex-1 flex flex-col gap-4 p-10 border-x-2 border-b-2 ${cart.length > 0 ? "" : "justify-center items-center"}`}>
        {cart.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">Cart</h1>
                <button className="cursor-pointer" onClick={clearCart}>Clear cart</button>
            </div>
            <article>
              {cart.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  categories={categories}
                  removeFromCart={removeFromCart}
                />
              ))}
            </article>
          </>
        ) : (
          <h1 className="text-4xl">Your cart is empty</h1>
        )}
      </section>
    </main>
  );
}

function CartItem({ product, categories, removeFromCart }) {
  return (
    <div
      key={product.id}
      className="flex items-center justify-between p-10 border-b-2 "
    >
      <section className="flex items-center gap-10">
        <p className="text-2xl">{categories.find((category) => category.id == product.category).icon}</p>
        <h3 className="text-2xl">{product.name}</h3>
        <p className="text-2xl">£{product.price}</p>
      </section>
      <section className="flex items-center gap-10">
        <button
          className="cursor-pointer"
          onClick={() => removeFromCart(product.id)}
        >
          Remove from Cart
        </button>
      </section>
    </div>
  );
}

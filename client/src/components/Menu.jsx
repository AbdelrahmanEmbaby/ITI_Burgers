import { useState } from "react";
export default function Menu({
  categoriesUtility,
  productsUtility,
  cartUtility,
  searchUtility,
  paginationUtility,
}) {
  const { categories, changeSelected } = categoriesUtility;
  const { products } = productsUtility;
  const { cart, addToCart, removeFromCart } = cartUtility;
  const { search } = searchUtility;
  const { currentPage, changePage } = paginationUtility;

  let filteredProducts = !categories.every((category) => !category.selected)
    ? products.filter(
        (product) =>
          categories.find((category) => category.id == product.category)
            .selected
      )
    : products;

  filteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const numOfItemsPerPage = 5;
  const numOfPages = Math.ceil(filteredProducts.length / numOfItemsPerPage);
  const start = (currentPage - 1) * numOfItemsPerPage;
  const end = start + numOfItemsPerPage;
  filteredProducts = filteredProducts.slice(start, end);
  return (
    <main
      className={`flex-4/5 border-b-2 ${
        filteredProducts.length > 0
          ? ""
          : "flex flex-col items-center justify-center"
      }`}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <MenuItem
            key={product.id}
            product={product}
            categories={categories}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))
      ) : (
        <p className="text-2xl">No products found</p>
      )}
      <div className="flex items-center justify-end gap-2 p-6">
        {Array(numOfPages)
          .fill()
          .map((_, index) => (
            <button
              key={index}
              className={`cursor-pointer ${
                currentPage === index + 1 ? "outline-2" : ""
              } p-3 py-1 hover:outline-2`}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </main>
  );
}

function MenuItem({ product, categories, cart, addToCart, removeFromCart }) {
  return (
    <div
      key={product.id}
      className="flex items-center justify-between p-10 border-b-2 border-r-2"
    >
      <section className="flex items-center gap-10">
        <p className="text-2xl">
          {categories.find((category) => category.id == product.category).icon}
        </p>
        <h3 className="text-2xl">{product.name}</h3>
        <p className="text-2xl">£{product.price}</p>
      </section>
      <section className="flex items-center gap-10">
        {cart.find((item) => item.id === product.id) ? (
          <button
            className="cursor-pointer"
            onClick={() => removeFromCart(product.id)}
          >
            Remove from Cart
          </button>
        ) : (
          <button className="cursor-pointer" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        )}
      </section>
    </div>
  );
}

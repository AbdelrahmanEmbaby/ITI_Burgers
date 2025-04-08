import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "axios";

import Home from "./pages/Home";
import Cart from "./pages/Cart";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart([...cart, { ...item, quantity: 1 }]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
    resetPage();
  };
  const clearSearch = () => {
    setSearch("");
    resetPage();
  };

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const changeSelected = (id) => {
    setCategories((categories) => {
      let newCategories = [];

      if (id === 0) {
        newCategories = categories.map((category) => ({
          ...category,
          selected: !categories[0].selected,
        }));
      } else {
        newCategories = categories.map((category) =>
          category.id === id
            ? {
                ...category,
                selected: !category.selected,
              }
            : category
        );
        const allSelected = newCategories
          .slice(1)
          .every((category) => category.selected);
        newCategories[0] = { ...newCategories[0], selected: allSelected };
      }

      return newCategories;
    });
    resetPage();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const changePage = (page) => setCurrentPage(page);
  const resetPage = () => setCurrentPage(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/categories");
        setCategories(() => {
          const cat = data.map((category) => ({ ...category, selected: true }));
          cat.unshift({ id: 0, name: "All", selected: true });
          return cat;
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <div className="font-[Orbitron] bg-white text-black">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchUtility={{ search, handleSearch, clearSearch }}
                cartUtility={{ cart, addToCart, removeFromCart }}
                categoriesUtility={{ categories, changeSelected }}
                productsUtility={{ products }}
                paginationUtility={{ currentPage, changePage }}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                searchUtility={{ search, handleSearch, clearSearch }}
                cartUtility={{ cart, removeFromCart, clearCart }}
                categoriesUtility={{ categories, changeSelected }}
                productsUtility={{ products }}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Menu from "../components/Menu";

export default function Home({
  searchUtility,
  cartUtility,
  categoriesUtility,
  productsUtility,
  paginationUtility,
}) {
  const { categories, changeSelected } = categoriesUtility;
  const { products } = productsUtility;
  return (
    <div className="flex flex-col h-screen">
      <Navbar searchUtility={searchUtility} />
      <div className="flex-1 flex">
        <Categories categoriesUtility={{ categories, changeSelected }} />
        <Menu
          categoriesUtility={{ categories, changeSelected }}
          productsUtility={{ products }}
          cartUtility={cartUtility}
          searchUtility={searchUtility}
          paginationUtility={paginationUtility}
        />
      </div>
    </div>
  );
}

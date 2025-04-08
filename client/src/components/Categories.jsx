import React from "react";

export default function Categories({ categoriesUtility }) {
  const { categories, changeSelected } = categoriesUtility;

  return (
    <aside className="flex-1/5 border-x-2 border-b-2 p-10 flex flex-col gap-15">
      <h2 className="text-3xl">Menu</h2>
      <ul className="flex flex-col gap-8">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center gap-2 text-xl">
            <input
              className="peer hidden"
              type="checkbox"
              id={category.id}
              checked={category.selected}
              onChange={() => changeSelected(category.id)}
            />
            <label
              htmlFor={category.id}
              className="w-5 h-5 border-2 border-gray-300  cursor-pointer flex items-center justify-center peer-checked:bg-black peer-checked:border-black"
            >
              {category.selected && <div className="w-3 h-3 bg-white "></div>}
            </label>
            <span
              className="select-none cursor-pointer"
              onClick={() => changeSelected(category.id)}
            >
              {category.name}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

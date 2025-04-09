import { useState, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import { postData, deleteData, updateData } from "../util/dataUtil";
import { TriggerContext } from "../App";
import { isAlphanumericUnicode, areEmojis } from "../util/validation";

export default function Admin({
  searchUtility,
  categoriesUtility,
  productsUtility,
}) {
  const { categories } = categoriesUtility;
  const { products } = productsUtility;
  const [adminSearch, setAdminSearch] = useState("");
  const handleAdminSearch = (e) => setAdminSearch(e.target.value);

  const [addProductForm, setAddProductForm] = useState({
    name: { value: "", error: "Name must only contain letters and numbers" },
    category: { value: 1, error: "Please select a category" },
    price: { value: -1, error: "Please enter a price" },
  });
  const addProductModalRef = useRef(null);
  const handleAddProductForm = (e) => {
    setAddProductForm({
      ...addProductForm,
      [e.target.id]: { ...addProductForm[e.target.id], value: e.target.value },
    });
  };
  const resetAddProductForm = () => {
    setAddProductForm({
      name: { value: "", error: "Name must only contain letters and numbers" },
      category: { value: 1, error: "Please select a category" },
      price: { value: -1, error: "Please enter a price" },
    });
  };
  const { fireTrigger } = useContext(TriggerContext);
  const addProduct = async (e) => {
    e.preventDefault();
    const { name, category, price } = addProductForm;
    const res = await postData("products", {
      name: name.value,
      category: category.value,
      price: Math.round(price.value * 100) / 100,
    });
    if (!res.error) {
      addProductModalRef.current.close();
      fireTrigger();
      resetAddProductForm();
    }
  };

  const [addCategoryForm, setAddCategoryForm] = useState({
    name: { value: "", error: "Name must only contain letters and numbers" },
    icon: { value: "", error: "Only emojis are allowed" },
  });
  const addCategoryModalRef = useRef(null);
  const handleAddCategoryForm = (e) => {
    setAddCategoryForm({
      ...addCategoryForm,
      [e.target.id]: { ...addCategoryForm[e.target.id], value: e.target.value },
    });
  };
  const resetAddCategoryForm = () => {
    setAddCategoryForm({
      name: { value: "", error: "Name must only contain letters and numbers" },
      icon: { value: "", error: "Only emojis are allowed" },
    });
  };
  const addCategory = async (e) => {
    e.preventDefault();
    const { name, icon } = addCategoryForm;
    const res = await postData("categories", {
      name: name.value,
      icon: icon.value,
    });
    if (!res.error) {
      addCategoryModalRef.current.close();
      fireTrigger();
      resetAddCategoryForm();
    }
  };

  const [editForm, setEditForm] = useState({
    id: -1,
    name: { value: "", error: "Name must only contain letters and numbers" },
    category: { value: 1, error: "Please select a category" },
    price: { value: -1, error: "Please enter a price" },
  });
  const editModalRef = useRef(null);
  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    setEditForm({
      id: product.id,
      name: {
        value: product.name,
        error: "Name must only contain letters and numbers",
      },
      category: { value: product.category, error: "Please select a category" },
      price: { value: product.price, error: "Please enter a price" },
    });
    editModalRef.current.showModal();
  };
  const handleEditForm = (e) => {
    setEditForm({
      ...editForm,
      [e.target.id]: { ...editForm[e.target.id], value: e.target.value },
    });
  };
  const resetEditForm = () => {
    setEditForm({
      id: -1,
      name: { value: "", error: "Name must only contain letters and numbers" },
      category: { value: 1, error: "Please select a category" },
      price: { value: -1, error: "Please enter a price" },
    });
  };
  const editProduct = async (e) => {
    e.preventDefault();
    const { id, name, category, price } = editForm;
    const res = await updateData("products", id, {
      name: name.value,
      category: category.value,
      price: Math.round(price.value * 100) / 100,
    });
    if (!res.error) {
      editModalRef.current.close();
      fireTrigger();
      resetEditForm();
    }
  };

  const [deleteID, setDeleteID] = useState(-1);
  const deleteModalRef = useRef(null);
  const handleDelete = (id) => {
    setDeleteID(id);
    deleteModalRef.current.showModal();
  };
  const deleteProduct = async (e) => {
    e.preventDefault();
    const res = await deleteData("products", deleteID);
    if (!res.error) {
      setDeleteID(-1);
      fireTrigger();
      deleteModalRef.current.close();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <Navbar searchUtility={searchUtility} />
      <main className="flex-1 flex flex-col gap-5 border-x-2 border-b-2 p-10 pb-2">
        <section className="h-fit flex justify-between w-full">
          <div>
            <p className="text-3xl">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center px-2 border-2">
              <label htmlFor="admin-search">
                <svg
                  className="w-5 h-5"
                  viewBox="0 -0.5 21 21"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="SVGRepo_bgCarrier"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>search_left [#1504]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g id="Page-1" stroke="none" fill="none" fillRule="evenodd">
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-299.000000, -280.000000)"
                        fill="#000000"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z"
                            id="search_left-[#1504]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </label>
              <input
                className="p-2 outline-none"
                type="text"
                value={adminSearch}
                placeholder="Search by name ..."
                id="admin-search"
                onChange={handleAdminSearch}
                required={true}
              />
            </div>
            <button
              className="cursor-pointer px-4 py-2 outline-2 hover:text-white hover:bg-black"
              onClick={() => addProductModalRef.current.showModal()}
            >
              Add Product
            </button>
            <button
              className="cursor-pointer px-4 py-2 outline-2 hover:text-white hover:bg-black"
              onClick={() => addCategoryModalRef.current.showModal()}
            >
              Add Category
            </button>
          </div>
        </section>
        <section
          className={`${
            filteredProducts.length > 0 ? "" : "flex-1"
          } flex items-center justify-center`}
        >
          {filteredProducts.length > 0 ? (
            <table className="w-full">
              <thead className="block">
                <tr className="border-2 flex w-full">
                  <th className="text-start p-3 flex-1">Name</th>
                  <th className="text-start p-3 flex-1">Price</th>
                  <th className="text-start p-3 flex-1">Category</th>
                  <th className="text-start p-3 flex-1">Actions</th>
                </tr>
              </thead>
              <tbody className="block max-h-[67vh] overflow-y-auto w-full border-x-2 border-b-2">
                {filteredProducts.map((product, idx) => (
                  <tr
                    key={product.id}
                    className={`${
                      idx < filteredProducts.length - 1 && "border-b-2"
                    } flex items-center w-full`}
                  >
                    <td className="py-1 px-3 flex-1">{product.name}</td>
                    <td className="py-1 px-3 flex-1">£{product.price}</td>
                    <td className="py-1 px-3 flex-1">
                      {
                        categories.find(
                          (category) => category.id == product.category
                        ).icon
                      }{" "}
                      {
                        categories.find(
                          (category) => category.id == product.category
                        ).name
                      }
                    </td>
                    <td className="p-3 flex-1 flex gap-4">
                      <button
                        className="cursor-pointer p-2 hover:outline-2"
                        onClick={() => handleEdit(product.id)}
                      >
                        🖋️ Edit
                      </button>
                      <button
                        className="cursor-pointer p-2 hover:outline-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-2xl text-center">No products found</p>
          )}
        </section>
        {/* tried to use daisy ui modal but it didn't work properly */}
        <dialog ref={addProductModalRef} className="custom-modal">
          <div className="modal-box duration-200 rounded-none border-2 flex flex-col gap-6 p-8">
            <h3 className="text-2xl">Add Product</h3>
            <form
              method="dialog"
              className="flex flex-col gap-5"
              onSubmit={addProduct}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name">Product Name</label>
                <input
                  className="border-2 p-2 outline-none"
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={addProductForm.name.value}
                  onChange={handleAddProductForm}
                  required={true}
                />
                {addProductForm.name.value &&
                  !isAlphanumericUnicode(addProductForm.name.value) && (
                    <p className="text-red-500">{addProductForm.name.error}</p>
                  )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="product-price">Product Price</label>
                <input
                  className="border-2 p-2 outline-none"
                  type="number"
                  placeholder="Price"
                  id="price"
                  min="0"
                  value={
                    addProductForm.price.value > -1
                      ? addProductForm.price.value
                      : ""
                  }
                  onChange={handleAddProductForm}
                  required={true}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="product-category">Product Category</label>
                <select
                  className="border-2 p-2 outline-none"
                  name="product-category"
                  id="category"
                  value={addProductForm.category.value}
                  onChange={handleAddProductForm}
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="cursor-pointer p-2 outline-2 hover:text-white hover:bg-black"
              >
                Add Product
              </button>
              <button
                className="absolute right-4 top-4 px-1 cursor-pointer font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  addProductModalRef.current.close();
                  resetAddProductForm();
                }}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
        <dialog ref={addCategoryModalRef} className="custom-modal">
          <div className="modal-box rounded-none border-2 flex flex-col gap-6 p-8">
            <h3 className="text-2xl">Add Category</h3>
            <form
              method="dialog"
              className="flex flex-col gap-5"
              onSubmit={addCategory}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="category-name">Category Name</label>
                <input
                  className="border-2 p-2 outline-none"
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={addCategoryForm.name.value}
                  onChange={handleAddCategoryForm}
                  required={true}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="category-icon">Category Icon</label>
                <input
                  className="border-2 p-2 outline-none"
                  type="text"
                  placeholder="Icon"
                  id="icon"
                  value={addCategoryForm.icon.value}
                  onChange={handleAddCategoryForm}
                  required={true}
                />
                {addCategoryForm.icon.value &&
                  !areEmojis(addCategoryForm.icon.value) && (
                    <p className="text-red-500">{addCategoryForm.icon.error}</p>
                  )}
              </div>
              <button
                type="submit"
                className="cursor-pointer outline-2 p-2 hover:text-white hover:bg-black"
              >
                Add Category
              </button>
              <button
                className="absolute right-4 top-4 px-1 cursor-pointer font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  addCategoryModalRef.current.close();
                  resetAddCategoryForm();
                }}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
        <dialog ref={editModalRef} className="custom-modal">
          <div className="modal-box rounded-none border-2 flex flex-col gap-6 p-8">
            <h3 className="text-2xl">Edit Product</h3>
            <form
              method="dialog"
              className="flex flex-col gap-5"
              onSubmit={editProduct}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name">Product Name</label>
                <input
                  className="border-2 p-2 outline-none"
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={editForm.name.value}
                  onChange={handleEditForm}
                  required={true}
                />
                {editForm.name.value &&
                  !isAlphanumericUnicode(editForm.name.value) && (
                    <p className="text-red-500">{editForm.name.error}</p>
                  )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="product-price">Product Price</label>
                <input
                  className="border-2 p-2 outline-none"
                  type="number"
                  placeholder="Price"
                  id="price"
                  min="0"
                  value={editForm.price.value}
                  onChange={handleEditForm}
                  required={true}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="product-category">Product Category</label>
                <select
                  className="border-2 p-2 outline-none"
                  name="product-category"
                  id="category"
                  value={editForm.category.value}
                  onChange={handleEditForm}
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="cursor-pointer outline-2 p-2 hover:text-white hover:bg-black"
              >
                Edit Product
              </button>
              <button
                className="absolute right-4 top-4 px-1 cursor-pointer font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  editModalRef.current.close();
                  resetEditForm();
                }}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
        <dialog ref={deleteModalRef} className="custom-modal">
          <div className="modal-box rounded-none border-2 flex flex-col gap-6 p-8">
            <h3 className="text-2xl">Delete Product</h3>
            <form
              method="dialog"
              className="flex flex-col gap-5"
              onSubmit={deleteProduct}
            >
              <p className="text-2xl">
                Are you sure you want to delete this product?
              </p>
              <button
                type="submit"
                className="cursor-pointer border-2 p-2 hover:text-white hover:bg-red-600"
              >
                Delete
              </button>
              <button
                className="absolute right-4 top-4 px-1 cursor-pointer font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  deleteModalRef.current.close();
                }}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </main>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderBottom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const ref = useRef();

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/items`
      );
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Update filtered products whenever the search query or product list changes
  useEffect(() => {
    const filtered = allProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto flex justify-center items-center py-4">
        <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl shadow-md">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search your products here"
          />
          <FaSearch className="w-5 h-5 text-gray-500" />
          {searchQuery && (
            <div
              className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
            >
              {filteredProducts.map((item) => (
                <div
                  onClick={() => {
                    const updatedItem = {
                      ...item,
                      imageUrl: `${process.env.REACT_APP_BACKEND_BASE_URL}${item.imageUrl}`,
                    };

                    navigate(
                      `/product/${item.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`,
                      {
                        state: { item: updatedItem },
                      }
                    );

                    setSearchQuery(""); // Clear the search query after clicking
                  }}
                  key={item.id}
                  className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                >
                  <img
                    className="w-24"
                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}${item.imageUrl}`}
                    alt={item.name}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-xs">{item.description}</p>
                    <p className="text-sm">
                      Price:{" "}
                      <span className="text-primeColor font-semibold">
                        ${item.price}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Category: {item.categoryName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;

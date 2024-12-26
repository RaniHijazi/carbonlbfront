import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import axios from "axios";

const ProductBanner = ({
  itemsPerPageFromBanner,
  onLabelClick,
  onCategoryClick,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(""); // Track selected label
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7025/api/Store/categories"
        );
        setCategories(response.data); // Store fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle label change (Bestseller, Special Offer, New Arrival)
  const handleLabelChange = (event) => {
    const selectedLabelValue = event.target.value;
    setSelectedLabel(selectedLabelValue); // Update selected label
    setSelectedCategory(""); // Reset category filter
    onLabelClick(selectedLabelValue); // Trigger label handler
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    const selectedCategoryValue = event.target.value;
    setSelectedCategory(selectedCategoryValue); // Update selected category
    setSelectedLabel(""); // Reset label filter
    if (selectedCategoryValue === "All Items") {
      onCategoryClick(""); // Pass empty string to fetch all items
    } else {
      onCategoryClick(selectedCategoryValue); // Trigger category handler
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        {/* Sort by label */}
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Sort by:</label>
          <select
            id="labelSelect"
            value={selectedLabel} // Bind to selected label
            onChange={handleLabelChange}
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="">Select Type</option>
            <option value="Bestseller">Best Sellers</option>
            <option value="SpecialOffer">Special Offer</option>
            <option value="NewArrival">New Arrival</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

        {/* Category dropdown */}
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Category:</label>
          <select
            id="categorySelect"
            value={selectedCategory} // Bind to selected category
            onChange={handleCategoryChange}
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="">Select Category</option>
            <option value="All Items">All Items</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;

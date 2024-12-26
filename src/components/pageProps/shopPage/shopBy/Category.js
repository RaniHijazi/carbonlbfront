import React, { useState, useEffect } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import axios from "axios";

const Category = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [showSubCatOne, setShowSubCatOne] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7025/api/Store/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchItemsByCategory = async (categoryName) => {
    try {
      const response = await axios.get(
        `https://localhost:7025/api/Store/items/category/${categoryName}`
      );
      console.log("Fetched items for category:", categoryName, response.data);
      onCategoryClick(response.data); // Pass data to Shop
    } catch (error) {
      console.error(
        `Error fetching items for category ${categoryName}:`,
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map((category, index) => (
            <li
              key={index}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
              onClick={() => fetchItemsByCategory(category.name)}
            >
              {category.name}
              {category.hasSubCategories && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSubCatOne(!showSubCatOne);
                  }}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;

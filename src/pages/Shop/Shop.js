import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import axios from "axios";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12); // Items per page
  const [filteredItems, setFilteredItems] = useState([]); // Items for category and color

  useEffect(() => {
    // Fetch all items initially
    const fetchAllItems = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7025/api/Store/items"
        );
        setFilteredItems(response.data); // Display all items initially
      } catch (error) {
        console.error("Error fetching all items:", error);
      }
    };

    fetchAllItems();
  }, []);

  const handleCategoryClick = async (selectedCategory) => {
    try {
      if (selectedCategory === "All Items" || selectedCategory === "") {
        // Fetch all items when "All Items" is selected or category is empty
        const response = await axios.get(
          "https://localhost:7025/api/Store/items"
        );
        setFilteredItems(response.data); // Display all items
      } else {
        // Fetch items for the selected category
        const response = await axios.get(
          `https://localhost:7025/api/Store/items/category/${selectedCategory}`
        );
        setFilteredItems(response.data); // Display filtered items
      }
    } catch (error) {
      console.error(
        `Error fetching items for category "${selectedCategory}":`,
        error
      );
    }
  };

  // Handle label selection
  const handleLabelClick = async (label) => {
    if (label === "All Items") {
      // Fetch and display all items when "All Items" is selected
      try {
        const response = await axios.get(
          "https://localhost:7025/api/Store/items"
        );
        setFilteredItems(response.data); // Show all items
      } catch (error) {
        console.error("Error fetching all items:", error);
      }
    } else {
      // Fetch and display items for selected label
      try {
        const response = await axios.get(
          `https://localhost:7025/api/Store/items/filter/label?label=${label}`
        );
        setFilteredItems(response.data); // Show filtered items
      } catch (error) {
        console.error(`Error fetching items for label "${label}":`, error);
      }
    }
  };

  // Handle color selection
  const handleColorClick = async (color) => {
    try {
      const response = await axios.get(
        `https://localhost:7025/api/Store/items/filter/color?color=${color}`
      );
      setFilteredItems(response.data); // Update items with filtered color
    } catch (error) {
      console.error("Error fetching items by color:", error);
    }
  };

  // Handle price selection
  const handlePriceClick = async (priceRange) => {
    try {
      const response = await axios.get(
        `https://localhost:7025/api/Store/items/filter/price?minPrice=${priceRange.priceOne}&maxPrice=${priceRange.priceTwo}`
      );
      setFilteredItems(response.data); // Update items with filtered price range
    } catch (error) {
      console.error("Error fetching items by price:", error);
    }
  };

  // Update items per page from banner
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav
            onCategoryClick={handleCategoryClick}
            onColorClick={handleColorClick}
            onPriceClick={handlePriceClick}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            onLabelClick={handleLabelClick}
            onCategoryClick={handleCategoryClick}
          />

          <Pagination items={filteredItems} itemsPerPage={itemsPerPage} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;

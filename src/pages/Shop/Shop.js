import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import axios from "axios";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12); // Items per page
  const [filteredItems, setFilteredItems] = useState([]); // Items for category and color

  useEffect(() => {
    // Fetch all items initially
    const fetchAllItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7025/api/Store/items"
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
          "http://localhost:7025/api/Store/items"
        );
        setFilteredItems(response.data); // Display all items
      } else {
        // Fetch items for the selected category
        const response = await axios.get(
          `http://localhost:7025/api/Store/items/category/${selectedCategory}`
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
          "http://localhost:7025/api/Store/items"
        );
        setFilteredItems(response.data); // Show all items
      } catch (error) {
        console.error("Error fetching all items:", error);
      }
    } else {
      // Fetch and display items for selected label
      try {
        const response = await axios.get(
          `http://localhost:7025/api/Store/items/filter/label?label=${label}`
        );
        setFilteredItems(response.data); // Show filtered items
      } catch (error) {
        console.error(`Error fetching items for label "${label}":`, error);
      }
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
      <div className="w-full h-full pb-20">
        <div className="w-full h-full flex flex-col gap-10">
          <ProductBanner
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            onLabelClick={handleLabelClick}
            onCategoryClick={handleCategoryClick}
          />
          <div className="flex justify-center items-center">
            <Pagination items={filteredItems} itemsPerPage={itemsPerPage} />
          </div>
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;

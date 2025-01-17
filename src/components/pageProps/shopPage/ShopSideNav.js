import React from "react";
import axios from "axios";

const ShopSideNav = ({ onCategoryClick, onColorClick, onPriceClick }) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/categories`
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/items/category/${categoryName}`
      );

      onCategoryClick(response.data); // Pass the category items to parent
    } catch (error) {
      console.error(
        `Error fetching items for category ${categoryName}:`,
        error
      );
    }
  };
};

export default ShopSideNav;

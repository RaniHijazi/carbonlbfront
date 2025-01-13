import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import axios from "axios";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bestseller products from the backend
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/bestsellers`
        );
        setProducts(response.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bestseller items:", error);
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []); // Empty dependency array ensures the request is made once when the component is mounted

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No bestseller items found.</div>;
  }

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Product
            key={product.id}
            _id={product.id}
            imageUrl={`${process.env.REACT_APP_BACKEND_BASE_URL}${product.imageUrl}`}
            name={product.name}
            price={product.price}
            color={product.color}
            badge={true}
            des={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;

import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import axios from "axios";

const SpecialOffers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch special offer products from the backend
    const fetchSpecialOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7025/api/Store/special-offers"
        );
        setProducts(response.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching special offer items:", error);
        setLoading(false);
      }
    };

    fetchSpecialOffers();
  }, []); // Empty dependency array ensures the request is made once when the component is mounted

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No special offer items found.</div>;
  }

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Product
            key={product.id}
            _id={product.id}
            imageUrl={`http://localhost:7025${product.imageUrl}`}
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

export default SpecialOffers;

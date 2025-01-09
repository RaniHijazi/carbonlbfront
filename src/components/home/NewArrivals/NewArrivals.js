import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import axios from "axios";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this function is called only once
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7025/api/Store/new-arrivals"
        );
        setProducts(response.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []); // Empty dependency array ensures it runs once

  const settings = {
    infinite: false, // Disable infinite looping
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true, // You can keep this for smaller screens if you need it
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true, // Same here, adjust as needed
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true, // You can adjust this for mobile screens
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No new arrivals found.</div>;
  }

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <Product
              _id={product.id}
              imageUrl={`http://localhost:7025${product.imageUrl}`}
              name={product.name}
              price={product.price}
              color={product.color}
              badge={true}
              des={product.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;

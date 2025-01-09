import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <div className="mt-4">
          <a
            href={`https://wa.me/96171142459?text=Hello, I am interested in buying the following product:%0A%0AProduct Name: ${productInfo.name}%0APrice: $${productInfo.price}%0AColor: ${productInfo.color}%0AImage: ${productInfo.imageUrl}%0A%0AIs this product available?`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-primeColor text-white py-2 rounded hover:bg-opacity-90 transition duration-300"
          >
            Buy on WhatsApp
            <span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="inline-block w-4 h-4 ml-2"
              />
            </span>
          </a>
        </div>
    </div>
  );
};

export default ProductInfo;

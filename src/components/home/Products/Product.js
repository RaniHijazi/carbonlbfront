import React from "react";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: props,
      },
    });
  };

  return (
    <div className="w-full relative">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div>
          <Image className="w-full h-full" imgSrc={props.imageUrl} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{props.name}</h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
        <div className="mt-4">
          <a
            href={`https://wa.me/96176579579?text=Hello, I am interested in buying the following product:%0A%0AProduct Name: ${props.name}%0APrice: $${props.price}%0AColor: ${props.color}%0AImage: ${props.imageUrl}%0A%0AIs this product available?`}
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
        <div className="mt-2">
          <button
            onClick={handleProductDetails}
            className="inline-block w-full text-center bg-primeColor text-white py-2 rounded hover:bg-opacity-90 transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

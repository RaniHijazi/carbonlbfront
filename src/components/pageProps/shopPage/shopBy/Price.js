import React from "react";
import NavTitle from "./NavTitle";

const Price = ({ onPriceClick }) => {
  const priceList = [
    {
      _id: 950,
      priceOne: 0.0,
      priceTwo: 5.0,
    },
    {
      _id: 951,
      priceOne: 5.0,
      priceTwo: 10.0,
    },
    {
      _id: 952,
      priceOne: 10.0,
      priceTwo: 15.0,
    },
    {
      _id: 953,
      priceOne: 15.0,
      priceTwo: 25.0,
    },
    {
      _id: 954,
      priceOne: 400.0,
      priceTwo: 599.99,
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
    },
  ];

  const handlePriceClick = (priceRange) => {
    onPriceClick(priceRange);
  };
  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
              onClick={() => handlePriceClick(item)}
            >
              ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;

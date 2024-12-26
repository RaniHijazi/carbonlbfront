import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              _id={item.id}
              imageUrl={`https://localhost:7025${item.imageUrl}`}
              name={item.name}
              price={item.price}
              color={item.color}
              badge={true}
              description={item.description}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ items, itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0); // Offset to track current page start
  const [itemStart, setItemStart] = useState(1); // Start item number for display

  // Calculate the current items to display
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset); // Get the items for the current page
  const pageCount = Math.ceil(items.length / itemsPerPage); // Total number of pages

  // Handle page change
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset); // Update offset for the new page
    setItemStart(newOffset + 1); // Update the start item number
  };

  return (
    <div>
      {/* Render current items */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        {/* Display pagination range */}
        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

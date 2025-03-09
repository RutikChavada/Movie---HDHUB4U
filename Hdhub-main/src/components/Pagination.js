import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Pagination.css";
import imageData from "../Data/imageData";

const renderData = (data) => {
  return (
    <div>
      <div className="grid-container">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <Link
                to={{ pathname: "/RedirectPage" }} 
                state={item.id}>
                <div className="grid-item">
                  <img src={item.images} alt={item.title} />
                  <h3>{item.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [pageNumberLimit, setPageNumberLimit] = useState(5); // Set the limit to 50 pages
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5); 
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Generate the pages based on the data length
  const pages = [];
  for (let i = 1; i <= Math.ceil(imageData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imageData.slice(indexOfFirstItem, indexOfLastItem);

  // Render the page numbers, with limits for pagination
  const renderPageNumbers = pages.map((number) => {
    if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // Next button functionality
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    // Adjust page limits when moving past the current max
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // Previous button functionality
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    // Adjust page limits when moving past the current min
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // Display the ellipsis button if there are more pages to load
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <>
      <h1 className="pageheading">Latest Movies</h1>
      {renderData(currentItems)}
      <ul className="pageNumbers">
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
      </ul>
    </>
  );
}

export default PaginationComponent;

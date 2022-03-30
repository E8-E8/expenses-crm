import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import "../../css/pagination.css";

function Pagination({ itemsNumber, changePageNumber, itemsPerPage }) {
  const [pageNumber, setPageNumber] = useState(1);
  const handlePageClick = (event) => {
    setPageNumber();
  };
  return (
    <div id="pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(event) => changePageNumber(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={itemsNumber / itemsPerPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;
// Add a <div id="container"> to your HTML to see the componend rendered.

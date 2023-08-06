import { useState } from "react";
import Button from "./Button";
import classNames from "classnames";

const paginatedItems = (items, size) => (pageNo) => {
  return items.filter(
    (item, index) => index >= size * (pageNo - 1) && index < size * pageNo
  );
};

function PaginatedList({ items, size, renderItemFn, className }) {
  const pageSize = size || 5;
  const pagination = paginatedItems(items, pageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);

  const renderedItems = pagination(pageNumber).map(renderItemFn);

  const prevClasses = classNames("p-2", {
    invisible: pageNumber <= 1,
  });
  const nextClasses = classNames("p-2", {
    invisible: pageNumber >= totalPages,
  });

  const classes = classNames(className, "bg-white");

  const paginationElement = (
    <div className="border flex justify-between">
      <div className="flex">
        <Button
          success
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          &lt;
        </Button>
        <span className={prevClasses}>page: {pageNumber - 1}</span>
      </div>
      <span className="p-2">
        page: {pageNumber}/{totalPages}
      </span>
      <div className="flex">
        <span className={nextClasses}>page: {pageNumber + 1}</span>
        <Button
          success
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= totalPages}
        >
          &gt;
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes}>
      {renderedItems}
      {totalPages > 0 && paginationElement}
    </div>
  );
}

export default PaginatedList;

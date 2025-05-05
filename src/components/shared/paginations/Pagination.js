import Link from "next/link";
import React from "react";

const Pagination = ({
  currentPaginationItems,
  showMore,
  items,
  currenIndex,
  handleCurrentPage,
  totalPages,
  path = "", // Optional base path for hrefs
}) => {
  return (
    <div className="ltn__pagination-area text-center">
      <div className="ltn__pagination">
        <ul>
          {/* Previous Button */}
          <li>
            <Link
              href={`${path}?page=${currenIndex > 0 ? currenIndex - 1 : 0}`}
              onClick={(e) => {
                e.preventDefault();
                handleCurrentPage(currenIndex > 0 ? currenIndex - 1 : 0);
              }}
              style={{
                visibility: currenIndex > 0 ? "visible" : "hidden",
              }}
            >
              <i className="fas fa-angle-double-left"></i>
            </Link>
          </li>

          {/* Left Ellipsis */}
          {showMore === "left" && (
            <>
              <li>
                <Link
                  href={`${path}?page=0`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCurrentPage(0);
                  }}
                >
                  1
                </Link>
              </li>
              <li>
                <Link
                  href={`${path}?page=${currenIndex - 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCurrentPage(currenIndex - 1);
                  }}
                >
                  ...
                </Link>
              </li>
            </>
          )}

          {/* Page Numbers */}
          {currentPaginationItems?.map((item, idx) => (
            <li key={idx} className={item === currenIndex ? "active" : ""}>
              <Link
                href={`${path}?page=${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCurrentPage(item);
                }}
              >
                {item + 1}
              </Link>
            </li>
          ))}

          {/* Right Ellipsis */}
          {showMore === "right" && (
            <>
              <li>
                <Link
                  href={`${path}?page=${currenIndex + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCurrentPage(currenIndex + 1);
                  }}
                >
                  ...
                </Link>
              </li>
              <li>
                <Link
                  href={`${path}?page=${totalPages - 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCurrentPage(totalPages - 1);
                  }}
                >
                  {totalPages}
                </Link>
              </li>
            </>
          )}

          {/* Next Button */}
          <li>
            <Link
              href={`${path}?page=${
                currenIndex < totalPages - 1 ? currenIndex + 1 : totalPages - 1
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleCurrentPage(
                  currenIndex < totalPages - 1 ? currenIndex + 1 : totalPages - 1
                );
              }}
              style={{
                visibility: currenIndex < totalPages - 1 ? "visible" : "hidden",
              }}
            >
              <i className="fas fa-angle-double-right"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
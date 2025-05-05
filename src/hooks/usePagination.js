"use client";

import { useState, useEffect } from "react";

const usePagination = (filteredItems, currentLimit, pagiItemsLengthPerView, initialPage = 0) => {
  // Initialize with page from URL
  const [currentpage, setCurrentpage] = useState(initialPage);

  // Sync with external page changes (like URL updates)
  useEffect(() => {
    setCurrentpage(initialPage);
  }, [initialPage]);

  // pagination calculations
  const limit = currentLimit ? currentLimit : 6;
  const skip = limit * currentpage;
  const currentItems = filteredItems?.slice(skip, skip + limit) || [];
  const totalItems = filteredItems?.length || 0;
  const totalCurrentItems = currentItems?.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginationItems = [...Array(totalPages).keys()]; // More efficient array creation

  // Simplified page change handler
  const handleCurrentPage = (newPage) => {
    // Validate page range
    const validatedPage = Math.max(0, Math.min(newPage, totalPages - 1));
    setCurrentpage(validatedPage);
    return validatedPage; // Return the actual page that was set
  };

  // Dynamic pagination items calculation
  let showMore = false;
  let currentPaginationItems = paginationItems;
  
  if (totalPages > pagiItemsLengthPerView) {
    showMore = currentpage + 1 > totalPages / 2 ? "left" : "right";
    
    const halfView = Math.floor(pagiItemsLengthPerView / 2);
    let start = Math.max(0, currentpage - halfView);
    let end = Math.min(totalPages, start + pagiItemsLengthPerView);
    
    // Adjust if we're at the end
    if (end === totalPages) {
      start = Math.max(0, end - pagiItemsLengthPerView);
    }
    
    currentPaginationItems = paginationItems.slice(start, end);
    
    // Show ellipsis only if there are more pages
    if (start > 0) showMore = "left";
    if (end < totalPages) showMore = "right";
  }

  return {
    currentItems,
    totalItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
    firstItem: skip + 1,
    lastItem: Math.min(skip + limit, totalItems),
  };
};

export default usePagination;
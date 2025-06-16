import React from "react";

function SectionPagination({ paginationData, action }) {
  const currentPage = paginationData?.current_page;
  const lastPage = paginationData?.last_page;
  const totalLinks = paginationData?.links || [];

  const handleGoToPage = (pageNo) => {
    if (pageNo >= 1 && pageNo <= lastPage) {
      action(pageNo);
    }
  };

  return (
    <div className="pagination-outer">
      <div className="pagination-style1">
        <ul className="clearfix">
          {paginationData?.prev_page_url && (
            <li className="prev">
              <a onClick={() => handleGoToPage(currentPage - 1)}>
                <i className="fa fa-angle-left" />
              </a>
            </li>
          )}
          {totalLinks
            .filter(link => Number(link.label)) // Only numbered pages
            .map((link, idx) => (
              <li key={idx} className={link.active ? "active" : ""}>
                <a onClick={() => handleGoToPage(Number(link.label))}>
                  {link.label}
                </a>
              </li>
            ))}
          {paginationData?.next_page_url && (
            <li className="next">
              <a onClick={() => handleGoToPage(currentPage + 1)}>
                <i className="fa fa-angle-right" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SectionPagination;

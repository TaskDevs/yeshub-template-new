function SectionPagination({ paginationData, action, searchPag }) {
  const currentPage = paginationData?.current_page;
  const lastPage = paginationData?.last_page;
  const totalLinks = paginationData?.links || [];

  const handleGoToPage = (pageNo) => {
    if (pageNo >= 1 && pageNo <= lastPage) {
      searchPag ? action(searchPag, pageNo) : action(pageNo);
    }
  };

  return (
    <div className="pagination-outer">
      <div className="pagination-style1">
        <ul className="clearfix">

          {/* Previous Page */}
          {paginationData?.prev_page_url && (
            <li className="prev">
              <a onClick={() => handleGoToPage(currentPage - 1)}>
                <i className="fa fa-angle-left" />
              </a>
            </li>
          )}

          {/* Page Numbers */}
          {totalLinks
            .filter(link => Number(link.label)) // Only keep numbered pages
            .map((link, idx) => (
              <li
                key={idx}
                className={link.active ? "active" : ""}
              >
                <a onClick={() => handleGoToPage(Number(link.label))}>
                  {link.label}
                </a>
              </li>
            ))}

          {/* Next Page */}
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

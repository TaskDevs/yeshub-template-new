function SectionPagination({ paginationData, action, searchPag }) {
  const handleGoToPage = (pageNo) => {
    searchPag ? action(searchPag, pageNo) : action(pageNo);
  };
  return (
    <>
      <div className="pagination-outer">
        <div className="pagination-style1">
          <ul className="clearfix">
            {paginationData?.current !== "1" && (
              <li className="prev">
                <a
                  onClick={() => {
                    handleGoToPage(paginationData?.current - 1);
                  }}
                >
                  <span>
                    {" "}
                    <i className="fa fa-angle-left" />{" "}
                  </span>
                </a>
              </li>
            )}

            {paginationData?.link?.slice(1, -1).map((item, index) => (
              <li
                className={paginationData?.current == index + 1 && "active"}
                key={index}
              >
                <a onClick={() => handleGoToPage(index + 1)}>{index + 1}</a>
              </li>
            ))}

            {paginationData?.link?.length > 3 && (
              <li>
                <a className="#" href="#">
                  <i className="fa fa-ellipsis-h" />
                </a>
              </li>
            )}
            {paginationData?.link?.length > 4 && (
              <li>
                <a onClick={() => handleGoToPage(paginationData?.link?.length)}>
                  {paginationData?.link?.length}
                </a>
              </li>
            )}

            {paginationData?.current < paginationData?.link?.length && (
              <li className="next">
                <a
                  onClick={() => {
                    handleGoToPage(paginationData?.current + 1);
                  }}
                >
                  <span>
                    {" "}
                    <i className="fa fa-angle-right" />{" "}
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SectionPagination;

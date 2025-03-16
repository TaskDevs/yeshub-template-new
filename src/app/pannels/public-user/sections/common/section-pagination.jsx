// function SectionPagination() {
//     return (
//         <>
//             <div className="pagination-outer">
//                 <div className="pagination-style1">
//                     <ul className="clearfix">
//                         <li className="prev"><a href="#"><span> <i className="fa fa-angle-left" /> </span></a></li>
//                         <li><a href="#">1</a></li>
//                         <li className="active"><a href="#">2</a></li>
//                         <li><a href="#">3</a></li>
//                         <li><a className="#" href="#"><i className="fa fa-ellipsis-h" /></a></li>
//                         <li><a href="#">5</a></li>
//                         <li className="next"><a href="#"><span> <i className="fa fa-angle-right" /> </span></a></li>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     )
// }


function SectionPagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="pagination-outer">
            <div className="pagination-style1">
                <ul className="clearfix">
                    <li className="prev">
                        <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                            <span>
                                <i className="fa fa-angle-left" />
                            </span>
                        </button>
                    </li>
                    {getPageNumbers().map((pageNumber) => (
                        <li key={pageNumber} className={currentPage === pageNumber ? "active" : ""}>
                            <button onClick={() => handlePageClick(pageNumber)}>{pageNumber}</button>
                        </li>
                    ))}
                    <li className="next">
                        <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                            <span>
                                <i className="fa fa-angle-right" />
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SectionPagination;
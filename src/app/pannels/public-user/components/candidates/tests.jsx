applied-jobs



  // return (
  //   <>
  
  //     <div className="twm-right-section-panel candidate-save-job site-bg-gray">
  //       {/*Filter Short By*/}
  //       <SectionRecordsFilter _config={_filterConfig} />

  //       <div className="twm-jobs-list-wrap">
        
  //         { freelancerId? (
  //           <>
  //           {appliedMilestones.length === 0 && <p>No applied milestone found.</p>}
  //           </>
  //         )  : (
  //           <>
  //           {appliedJobs.length === 0 && <p>No applied job found.</p>}
  //           </>
  //         )}
  //           <ul>
              
  //             {freelancerId ? 
  //               (
  //                 appliedMilestones
  //                 ?.sort((a, b) => extractTime(b.created_at) - extractTime(a.created_at))
  //               .map((milestone) => (
  //                 <CanAppliedJobCard
  //                   data={milestone}
  //                   key={milestone.id}
                    
  //                 />
  //             ))
  //             ) :
  //             (
  //               <>
  //               {appliedJobs
  //               ?.sort((a, b) => extractTime(b.created_at) - extractTime(a.created_at))
  //               .map((job) => (
  //                 <CanAppliedJobCard
  //                   data={job}
  //                   key={job.id}
                    
  //                 />
  //               ))}
  //               </>
  //             ) }
              
  //           </ul>
         
  //       </div>

  //       <div>
  //         { freelancerId? appliedMilestones.length > 0 : appliedJobs.length > 0 && (
  //           <>
  //             {/* <SectionPagination /> */}

  //             <SectionPagination
  //                           currentPage={currentPage}
  //                           totalItems={totalItems}
  //                           itemsPerPage={itemsPerPage}
  //                           onPageChange={handlePageChange}
  //                       />

  //             <div className="sec-actions-btn d-flex justify-content-center align-items-center mt-5 w-100">
  //               <button
  //                 className="site-button  actions-btn"
  //                 data-bs-target="#delete-applied-job"
  //                 data-bs-toggle="modal"
  //                 data-bs-dismiss="modal"
  //               >
  //                 <FaRegTrashCan color="white" />
  //                 <span className="admin-nav-text">Delete</span>
  //               </button>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );
   


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

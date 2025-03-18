import { useContext } from "react";
import PopupPortfolioMedia from "../../../../common/popups/popup-portfolio-media";
import { PortfolioMediaApiData } from "../../../../context/portfolio-media/portfolioMediaContextApi";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { PortfolioApiData } from "../../../../context/portfolio/portfolioContextApi";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { PiBriefcaseLight } from "react-icons/pi";
import toast from "react-hot-toast";

function SectionCanProjects() {
    const {selectDeleteItem, setSelectDeleteItem, setSelectedItems, setFormData, handleAddPortfolioMedia, handleUpdatePortfolioMedia } = useContext(PortfolioMediaApiData)
    const { selectedId, setSelectedId } = useContext(GlobalApiData)
    const { portfolios } = useContext(PortfolioApiData)  
    const editPortfolio = portfolios?.find((portfolio) => portfolio?.media?.some((m) => m.id === selectedId) )
    
   
    const handleEditClick = (id) => {
        if (!id ) {
            toast.error("Please select the link to edit")
            return;
        }

        setSelectedId(id);

        if (editPortfolio) {
            const editPortfolioMedia = editPortfolio.media.find(m => m.id === id);
    
            if (editPortfolioMedia) {
                
                setFormData({
                    url: editPortfolioMedia.url, 
                    portfolio_media_id: editPortfolioMedia.id 
                });
    
                const selectedPortfolio = { value: editPortfolioMedia.id, label: editPortfolio.project_title };
                setSelectedItems(selectedPortfolio);
            } else {
                toast.error("Selected media not found.");
            }
        } else {
            toast.error("Please select Portfolio link to edit.");
        }

    };

    // const handleDeleteClick = (id) => {
    //     console.log("id-del",id)
    //     if (!id) {
    //         toast.error("Please select the link to delete")
    //         return;
    //     }
    //     setSelectDeleteItem(id)
    // }

    const handleDeleteClick = () => {
        console.log("id-del", selectDeleteItem);
        if (!selectDeleteItem) {
            toast.error("Please select the link to delete");
            return;
        }
        // No need to setSelectDeleteItem here
    };


    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Project Media</h4>
                <a data-bs-toggle="modal" href="#add-portfolio-media" role="button" title="Add" className="site-text-primary">
                    <span className="fa fa-plus" /> {" "} <span>Add</span>
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20 ">
               
                 
          <div className="panel-body wt-panel-body  ">
            <div className="twm-panel-inner">
              

{portfolios?.length === 0  || portfolios.every(port => port.media?.length === 0) ? (
    <p>No portfolio media added yet</p>
) : (
    <>
        {portfolios?.map((portfolio, i) => (
            portfolio.media?.length > 0 && (
                <div
                    key={i}
                    className="mb-4 sec-educ"
                >
                    <div className="">
                        <PiBriefcaseLight />
                    </div>
                    <div className="">
                        <div className="">
                            Project Title : {" "}
                            <span>{portfolio.project_title} </span>
                        </div>
                        <div className="media-lists">
                            <p>Project Link(s) {" "}</p>
                            <ul>
                                {portfolio.media.map((m) => (
                                    <li key={m.id} 
                                    // onClick={() => setSelectedId(m.id)}
                                    onClick={() => {
                                        setSelectedId(m.id);
                                        setSelectDeleteItem(m.id);
                                    }}
                                    >
                                        {m.url}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        ))}
        <div className="p-a20">
            <div className="sec-actions-btn">
                <button
                    className="site-button actions-btn"
                    data-bs-target="#delete-portfolio-media"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    onClick={() => handleDeleteClick()}
                >
                    <FaRegTrashCan color="white" />
                    <span className="admin-nav-text">Delete</span>
                </button>
                <button
                    className="site-button actions-btn"
                    data-bs-target="#edit-portfolio-media"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    onClick={() => {
                        handleEditClick(selectedId);
                    }}
                >
                    <MdOutlineEdit color="white" />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    </>
)}
            </div>
          </div>
       
            </div>
    

        <PopupPortfolioMedia submit={handleAddPortfolioMedia} id="add-portfolio-media"/>
        <PopupPortfolioMedia submit={handleUpdatePortfolioMedia} id="edit-portfolio-media"/>
          
        </>
    )
}
export default SectionCanProjects;



// <div className="modal fade twm-saved-jobs-view" id="Pro_ject" tabIndex={-1}>
// <div className="modal-dialog modal-dialog-centered">
//     <div className="modal-content">
//         <form>
//             <div className="modal-header">
//                 <h2 className="modal-title">Add Project</h2>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//             </div>
//             <div className="modal-body">
//                 <div className="row">
//                     <div className="col-xl-12 col-lg-12">
//                         <div className="form-group">
//                             <label>Project Title</label>
//                             <div className="ls-inputicon-box">
//                                 <input className="form-control" type="text" placeholder="Enter Project Title" />
//                                 <i className="fs-input-icon fa fa-address-card" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-12 col-lg-12">
//                         <div className="form-group">
//                             <label>Education</label>
//                             <div className="ls-inputicon-box">
//                                 <select className="wt-select-box selectpicker" data-live-search="true" title="" data-bv-field="size">
//                                     <option className="bs-title-option" value>Select Category</option>
//                                     <option>Graduation/Diploma</option>
//                                     <option>Masters/Post-Graduation</option>
//                                 </select>
//                                 <i className="fs-input-icon fa fa-user-graduate" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-12 col-lg-12">
//                         <div className="form-group">
//                             <label>Client</label>
//                             <div className="ls-inputicon-box">
//                                 <input className="form-control" type="text" placeholder="Enter Client Name" />
//                                 <i className="fs-input-icon fa fa-user" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-12 col-lg-12">
//                         <div className="form-group">
//                             <label>Project Status</label>
//                             <div className="row twm-form-radio-inline">
//                                 <div className="col-md-6">
//                                     <input className="form-check-input" type="radio" name="flexRadioDefault" id="In_Progress" />
//                                     <label className="form-check-label" htmlFor="In_Progress">
//                                         In Progress
//                                     </label>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <input className="form-check-input" type="radio" name="flexRadioDefault" id="Finished" defaultChecked />
//                                     <label className="form-check-label" htmlFor="Finished">
//                                         Finished
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
               
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label>Started Working From</label>
//                             <div className="ls-inputicon-box">
//                                 <input className="form-control datepicker" data-provide="datepicker" name="company_since" type="text" placeholder="mm/dd/yyyy" />
//                                 <i className="fs-input-icon far fa-calendar" />
//                             </div>
//                         </div>
//                     </div>
            
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label>Worked Till</label>
//                             <div className="ls-inputicon-box">
//                                 <input className="form-control datepicker" data-provide="datepicker" name="company_since" type="text" placeholder="mm/dd/yyyy" />
//                                 <i className="fs-input-icon far fa-calendar" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-12">
//                         <div className="form-group mb-0">
//                             <label>Detail of Projects</label>
//                             <textarea className="form-control" rows={3} placeholder="Describe your Job" defaultValue={""} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="modal-footer">
//                 <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
//                 <button type="button" className="site-button">Save</button>
//             </div>
//         </form>
//     </div>
// </div>
// </div>
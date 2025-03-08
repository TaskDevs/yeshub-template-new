import { useNavigate } from "react-router-dom";
import { GlobalApiData } from "../../../../context/global/globalContextApi";
import { useContext } from "react";
import { Button } from "primereact/button";
import YesNoPopup from "../../../../common/popups/popup-yes-no";
import { popupType } from "../../../../../globals/constants";
const EmpJobPostCard = ({ data }) => {
  const navigate = useNavigate();
  const { setSelectedId } = useContext(GlobalApiData);

  const handleNavigate = () => {
    navigate(`/dashboard-employer/candidates-list?jobid=${data.id}`);
  };

  return (
    <>
     <div className="flex gap-2">
      <Button icon="pi pi-eye" className="p-button-rounded p-button-primary" tooltip="View" onClick={handleNavigate} />
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-secondary" tooltip="Edit" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" tooltip="Delete" onClick={() => setSelectedId(data.id)} />
    </div>
    </>
   
  );
};

export default EmpJobPostCard;

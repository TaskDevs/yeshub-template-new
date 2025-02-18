import { useNavigate } from "react-router-dom";
import { popupType } from "../../../globals/constants";
import { publicUser } from "../../../globals/route-names";
import React from "react";
import { logout } from "../../context/auth/authApi"; // Import the logout function

function YesNoPopup(props) {
    const navigate = useNavigate();

    // Handle "Yes" button click
    const yesHandler = async () => {
        if (props.type === popupType.LOGOUT) {
            const result = await logout();  // Await logout function

            if (result) {
                // If logout is successful, navigate to login page
                navigateToAfterLogin();
            } else {
                // Optionally handle any failure in logout (e.g., show an error message)
                console.error("Logout failed");
            }
        }
    };

    // Navigate to login page
    const navigateToAfterLogin = () => {
        navigate(publicUser.pages.LOGIN);  // Navigate to login page after logout
    };

    return (
        <div className="modal fade twm-model-popup" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <h4 className="modal-title">{props.msg}</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="site-button" data-bs-dismiss="modal">No</button>
                        <button type="button" className="site-button outline-primary" data-bs-dismiss="modal" onClick={yesHandler}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YesNoPopup;

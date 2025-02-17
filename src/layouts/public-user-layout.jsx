import { useLocation } from "react-router-dom";
import SignUpPopup from "../app/common/popups/popup-signup";
import SignInPopup from "../app/common/popups/popup-signin";
import PublicUserRoutes from "../routing/public-user-routes";
// import InnerPageBanner from "../app/common/inner-page-banner";
// import { showBanner, setBanner } from "../globals/banner-data";
import { showHeader, showFooter, setFooterType, setHeaderType } from "../globals/layout-config";
import ContractPopup from "../app/common/popups/popup-contract";
import YesNoPopup from "../app/common/popups/popup-yes-no";
import { popupType } from "../globals/constants";

function PublicUserLayout() {
    const currentpath = useLocation().pathname;
    return (
        <>
            <div className="page-wraper">

                

                {/* Header */}
                {
                    showHeader(currentpath) &&
                    setHeaderType(currentpath)
                }

                <div className="page-content">
                    {/* {
                        showBanner(currentpath) &&
                        <InnerPageBanner _data={setBanner(currentpath)} />
                    } */}
                    <PublicUserRoutes />
                </div>

                {/* Footer */}
                {
                    showFooter(currentpath) &&
                    setFooterType(currentpath)
                }

                {/* BUTTON TOP START */}
                <button className="scroltop"><span className="fa fa-angle-up  relative" id="btn-vibrate" /></button>

                <SignUpPopup />
                <SignInPopup />
                <ContractPopup />
                <YesNoPopup
				id="delete-profile"
				type={popupType.DELETE_PROFILE}
				msg={"Are you sure you want to delete this profile?"}
			/>

            </div>
        </>
    )
}

export default PublicUserLayout;
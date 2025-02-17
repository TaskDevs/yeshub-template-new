import { toast } from "react-toastify";
import { SUCCESS_STATUS } from "../globals/constants";

export const notify = (
    status,
    success_mssg = "Operation Successful",
    fail_mssg = "Operation failed"
) => {
    if (status === SUCCESS_STATUS) {
        toast.success(success_mssg, {
            position: "top-center"
        })
    } else {
        toast.error(fail_mssg)
    }
}

export const topMessage = (status, error, changeState) => {
    const handleClose = () => changeState(false)
    return (
    <div className="errorAlert">
					<div className="inner">
						{status && "User logged in successfully"}
						{!status &&
							error &&
							"Oops!, An error ocurred while logging in. Try again"}
					</div>

					<button
						type="button"
						className="btn-close"
						aria-label="Close"
						onClick={() => handleClose()}
					/>
				</div>
    )
}
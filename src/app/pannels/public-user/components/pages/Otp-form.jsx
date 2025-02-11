import VerificationInput from "react-verification-input";

function OtpForm() {
    return (
			<div>
				<VerificationInput
					classNames={{
						container: "container",
						character: "character",
						characterInactive: "character--inactive",
						characterSelected: "character--selected",
						characterFilled: "character--filled",
					}}
				/>
			</div>
		);
}

export default OtpForm;

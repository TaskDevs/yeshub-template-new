import VerificationInput from "react-verification-input";



				

function OtpForm({ setOtp, otp, otpRef }) {
	

	console.log("otpRef-form", otpRef);

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
				value={otp}
				onChange={(value) => {
					setOtp(value);
					otpRef.current = value;
				}}
				onComplete={(value) => {
					setOtp(value);
					otpRef.current = value;
				}}
				validChars="0-9"
				autoFocus
			/>
		</div>
	);
}

export default OtpForm;

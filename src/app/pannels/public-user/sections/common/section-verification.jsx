import { FaRegUser } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";

function SectionVerification() {
	return (
		<>
			<h4 className="section-head-small mb-4">Verifications </h4>
			<div className="twm-s-contact">
				<div className="row">
					<div className="twm-sec-contact contact-icons">
						<FaRegUser size={20} />
						<MdPayment size={20} />
						<MdCall size={20} />
						<LuMessageSquare size={20} />
					</div>

					<div className="twm-verification-rate">
						<div className="">
							<p>on time</p>
							<p>on budget</p>
							<p>acceptance rate</p>
							<p>repeat hire rate</p>
						</div>

						<div className="sec-rate-percentages">
							<p>80%</p>
							<p>75%</p>
							<p>90%</p>
							<p>80%</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SectionVerification;



{/* <div className="col-lg-12">
						<div className="form-group mb-3">
							<input
								name="username"
								type="text"
								required
								className="form-control"
								placeholder="Name"
							/>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group mb-3">
							<input
								name="email"
								type="text"
								className="form-control"
								required
								placeholder="Email"
							/>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group mb-3">
							<input
								name="phone"
								type="text"
								className="form-control"
								required
								placeholder="Phone"
							/>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group mb-3">
							<textarea
								name="message"
								className="form-control"
								rows={3}
								placeholder="Message"
								defaultValue={""}
							/>
						</div>
					</div>
					<div className="col-md-12">
						<button type="submit" className="site-button">
							Submit Now
						</button>
                    </div> */}
import React from 'react'
import JobZImage from '../../../../common/jobz-img';

function EmpGetApplicants({ data }) {
  return (
		<tr >
			<td>
				<input type="checkbox" />
			</td>
			<td>
				<div className="twm-DT-candidates-list">
					<div className="twm-media">
						<div className="twm-media-pic">
							<JobZImage
								src={data.img || "images/candidates/pic1.jpg"}
								alt="#"
							/>
						</div>
					</div>
					<div className="twm-mid-content">
						<a href="#" className="twm-job-title">
							<h4>data.name </h4>
							<p className="twm-candidate-address">
								<i className="feather-map-pin" />
								New York
							</p>
						</a>
					</div>
				</div>
			</td>
			<td>UI Designer</td>
			<td>15/06/2023 at 10:35 am</td>
			<td>
				<div className="twm-jobs-category">
					<span className="twm-bg-green">data.status</span>
				</div>
			</td>
			<td>
				<div className="twm-table-controls">
					<ul className="twm-DT-controls-icon list-unstyled">
						<li>
							<button
								title="View profile"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
							>
								<span className="fa fa-eye" />
							</button>
						</li>
						<li>
							<button
								title="Send message"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
							>
								<span className="far fa-envelope-open" />
							</button>
						</li>
						<li>
							<button
								title="Delete"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
							>
								<span className="far fa-trash-alt" />
							</button>
						</li>
					</ul>
				</div>
			</td>
		</tr>
	);
}

export default EmpGetApplicants
import { MdOutlineStarRate } from "react-icons/md";
import JobZImage from "../../../../common/jobz-img";

function SectionReview() {
  return (
		<>
			<h4 className="twm-s-title">Reviews</h4>
			<div className="tw-sidebar-tags-wrap reviews-wrapper">
				<div className="twm-s-info">
					<div className="twm-sec-reviews">
						<div className="twm-media">
							<div className="twm-media-pic">
								<JobZImage src="images/candidates/pic4.jpg" alt="#" />
							</div>
							{/* <div className="twm-candidates-tag">
							<span>Featured</span>
						</div> */}
						</div>
						<div className="sub-sec-reviews">
							<div className="sec-reviews-rate">
								<MdOutlineStarRate size={20} />
								<MdOutlineStarRate size={20} />
								<MdOutlineStarRate size={20} />
								<MdOutlineStarRate size={20} />
							</div>

							<div className="">
								<p>Multi platform tour engagement</p>
								<p>Very professional and competent team</p>

								<ul className="sec-reviews-skills">
									<li>wireframe</li>
									<li>Prototyping</li>
									<li>Graphic design</li>
								</ul>

								<ul className="sec-reviews-skills">
									<li>Rob E.</li>
									<li>@Rob674</li>
									<li>Ghana</li>
									<li>3 weeks</li>
								</ul>
							</div>
						</div>
					</div>
              </div>
              
			</div>
		</>
	);
}

export default SectionReview
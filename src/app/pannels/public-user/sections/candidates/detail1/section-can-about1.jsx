function SectionCandidateAbout1({ props }) {
    return (
			<>
				<h4 className="twm-s-title">About Me</h4>
				<p>
					{props?.user?.bio}
				</p>
				
			</>
		);
}

export default SectionCandidateAbout1;
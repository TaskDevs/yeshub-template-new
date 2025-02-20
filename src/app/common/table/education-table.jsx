import React from 'react'

function EducationTable() {
  return (
		<>
			<div className="mt-8 bg-[#f5f5f5] p-2 sm:w-full w-[70rem]">
				<div className="grid grid-cols-6 font-bold p-2 gap-4">
					{headings.map((header, index) => (
						<div key={index} className="capitalize text-center">
							{header}
						</div>
					))}
				</div>

				{values.map((value, i) => (
					<div
						key={i}
						className="grid grid-cols-6 mb-2 items-center p-2 sm:gap-2 gap-6 bg-white text-sm capitalize font-[400]"
						onClick={() => (location === "learners" ? setOpenModal(true) : "")}
					>
						<div className="flex items-center gap-2">
							<img
								src={value.learners.src}
								alt=""
								className="w-8 h-8 rounded-full"
							/>
							<p>{value.learners.name}</p>
						</div>

						<div
							className={`${
								location === "invoices"
									? "md:text-start truncate overflow-hidden text-ellipsis whitespace-nowrap"
									: ""
							}text-center `}
						>
							{value.email}
						</div>

						{[value.amount, value.date, value.status].map((item, j) => (
							<div key={j} className="flex-center">
								{item}
							</div>
						))}

						<div className="flex gap-2 justify-center">
							{actions.includes("view") && (
								<span className="actions text-[#115EA5] bg-[#D1E5F8]">
									<MdOutlineRemoveRedEye />
								</span>
							)}
							{actions.includes("edit") && (
								<span className="actions text-[#77C053] bg-[#EDF7E8] ">
									<MdOutlineEdit />
								</span>
							)}
							{actions.includes("delete") && (
								<span className="text-[#A61D24] bg-[#F7E9EA] actions">
									<FaTrashCan />
								</span>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default EducationTable
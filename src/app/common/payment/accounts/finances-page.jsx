import React, { useEffect } from 'react'
import { loadScript } from '../../../../globals/constants'
import MakePayment from './make-payment'
import Wallet from './wallet'
import Milestone from './milestone'
import { useLocation } from 'react-router-dom'

function FinancesPage() {
	const currentpath = useLocation().pathname;
	const location = currentpath.split("/")[1];
	// console.log("currentpath", currentpath.split("/")[1]);


    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
			<>
				<div className="twm-right-section-panel site-bg-gray">
					{/*Resume Headline*/}

					<div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
						<h4 className="panel-tittle m-a0">Manage your Finances</h4>
						<a
							data-bs-toggle="modal"
							href="#Resume_Headline"
							role="button"
							title="Edit"
							className="site-text-primary"
						>
							<span className="fa fa-edit" />
						</a>
					</div>
					<div className="panel-body wt-panel-body p-a20 ">
						<div className="twm-panel-inner">
							<p>A platform that allows you to manage your finances securely</p>
						</div>
					</div>

					{/*Wallet*/}
					<div className="panel panel-default mb-3">
						<Wallet />
					</div>

					{/*MakePayment*/}
					{location === "dashboard-employer" && (
						<div className="panel panel-default mb-3">
							<MakePayment />
						</div>
					)}

					{/*Milestone*/}
					<div className="panel panel-default mb-3">
						<Milestone />
					</div>
				</div>
			</>
		);
}

export default FinancesPage
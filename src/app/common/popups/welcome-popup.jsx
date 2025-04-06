// import React from "react";
// import { Button } from "primereact/button";
// import { FaCheckCircle } from "react-icons/fa";
// import { publicUrlFor } from "../../../globals/constants";
// import { Card } from "primereact/card";
// import { Divider } from "primereact/divider";
// import { useNavigate } from "react-router-dom";


// const WelcomePopup = () => {

//   const userId = location.state?.userId

//   console.log("uid", userId)
//   const navigate = useNavigate();

//   const navigateRole = ()=>{
//     setTimeout(() => navigate("/user-select-role",  { state: {  userId } }), 2000);
//   }
//   return (
//     <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl bg-white p-8 m-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//       <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-start">
//         {/* Left Side: Text Content */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Hey, Louis!</h2>
//           <p className="text-gray-600 mt-2 text-2xl mb-6">
//             Ready for your next big opportunity?
//           </p>
//           <FaCheckCircle className="text-green-500 mr-2" /> Access to top
//           clients worldwide
//           <Divider />
//           <FaCheckCircle className="text-green-500 mr-2" /> Work on your terms,
//           flexible hours
//           <Divider />
//           <FaCheckCircle className="text-green-500 mr-2" /> Secure payments,
//           guaranteed
//           <Divider />
//           <FaCheckCircle className="text-green-500 mr-2" /> Grow your
//           professional network
//           <Divider />
//           <div className="flex flex-row lg:flex-row mx-3 items-center lg:items-start">
//             <Button
//               label="Get Started"
//               className="mt-3 lg:mt-0 rounded"
//               icon="pi pi-arrow-right"
//               severity="success"
//               onClick={()=> navigateRole()}
//             />
//             <div className="text-sm lg:ml-3 pt-4 lg:pt-0 text-center lg:text-left">
//               <p>
//                 This will only take 5-10 minutes and you can edit later.
//                 <br /> We will save as you go.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Image */}
//         <Card>
//           <div className="flex justify-center items-center">
//             <img
//               src={`${publicUrlFor("images/welcome/wel.jpg")}`}
//               alt="Welcome"
//               className="w-full rounded-lg shadow-md"
//               style={{ width: "400px", height: "400px" }}
//             />
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default WelcomePopup;

import React, { createContext } from "react";

import { savedJobs } from "./savedJobsApi";
import toast from "react-hot-toast";

export const SavedJobsApiData = createContext();


const SavedJobsApiDataProvider = (props) => {
//   const [skillOptions, setSkillOptions] = useState(null);
//   const [formData, setFormData] = useState(initialData);

//   const [skills, setSkills] = useState([]);
//   const [skill, setSkill] = useState({});

//   const getAllSkills = async () => {
// 		try {
// 			const res = await processGetAllSkills();
// 			let newData = [];

// 			res.map((item) => {
// 				let newObj = {
// 					id: item.id,
// 					name: item.skill,
// 				};
// 				newData.push(newObj);
// 			});
// 			setSkillOptions(newData);


// 			// Safely set skills
// 			if (Array.isArray(res)) {
// 				setSkills(res);
// 			} else {
// 				setSkills([]);
// 				notify("No skills found", "warning");
// 			}
// 		} catch (error) {
// 			console.error("get-all-skills-failed", error);
// 			setSkills([]);
// 		}
// 	};

//   useEffect(() => {
	

// 	getAllSkills();

	
// }, []);



//   const processAddSavedJobs = async (data) => {
//     try {
//       const res = await savedJobs(data);

//       if (res && res.data) {
       
//         toast.success("Job saved successfully")
//       } 
//     } catch (error) {
//       console.error("Add Skills Error:", error);
//       toast.success("Job saved successfully");
//     }
//   };


const processAddSavedJobs = async (data) => {
    try {
        const token = sessionStorage.getItem("authToken"); 
      const res = await savedJobs(data, token);
      console.log("res", res)
      if (res && res.data) {
        toast.success("Job saved successfully");
      }
    } catch (error) {
      
      toast.error("Failed to save job");
    }
  };
  




//   const processGetAllSkills = async () => {
//     try {
//       const res = await skillsList();

//       const skills = res.data;

//       return skills;
//     } catch (error) {
//       setSkills([]);
//     }
//   };



//   const processDeleteSkills = async (id) => {
//     const res = await deleteSkills(id);
//     return res;
//   };



//   const handleUpdateSkills = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await processUpdateSkills(selectedId, formData);
//       await getAllSkills();
//       toast.success("Skills updated successfully");
//       return res;
//     } catch (e) {
//       toast.error("Failed to update Skills");
//       throw new Error("failed to update skills", e);
//     } finally {
//       setFormData({
//         skill: "",
//       });
//       setSelectedId("");
//     }
//   };

//   const handleDeleteSkills = async () => {
// 		setIsSubmitting(true);
// 		try {
// 			await processDeleteSkills(selectedId);
//       await getAllSkills();

// 			toast.success("skills deleted successfully");
// 		} catch (error) {
// 			toast.error("Failed to delete skills");
// 			return false;
// 		} finally {
// 			setIsSubmitting(false);
//       setSelectedId("");
// 		}
// 	};



  return (
    <SavedJobsApiData.Provider
      value={{
        
        processAddSavedJobs,
        // processGetAllSkills,
        // processUpdateSkills,
        // processDeleteSkills,
  
        // handleUpdateSkills,
        // handleDeleteSkills
      }}
    >
      {props.children}
    </SavedJobsApiData.Provider>
  );
};

export default SavedJobsApiDataProvider;

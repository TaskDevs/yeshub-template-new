import React, { useContext, useEffect, useState } from "react";
// import { PortfolioMediaApiData } from '../context/portfolio-media/portfolioMediaContextApi';
import { PortfolioApiData } from "../context/portfolio/portfolioContextApi";
// import InputField from './input-field';
// import { PORTFOLIOFIELD } from "../../globals/portfolio-data";
import NewInputField from "./new-input-field";

// function PortfolioMediaForm() {
//   const { formData, handleChange } = useContext(PortfolioApiData);

//   return (
//     <div className="col-xl-12 col-lg-12">
//       <div className="p-field p-mb-3">
//         <label
//           htmlFor={PORTFOLIOFIELD.fieldDetail[6].name}
//           className="p-text-secondary p-d-block p-mb-2 p-font-bold"
//         >
//           Project Link
//         </label>
//         <div className="ls-inputicon-box">
//           <div className="">
//             <i className="fs-input-icon fa fa-address-card" />
//           </div>
//           <NewInputField
//             field={PORTFOLIOFIELD.fieldDetail[6]}
//             value={formData}
//             change={(data, field) => {
//               handleChange(data, field);
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

function PortfolioMediaForm() {
  const { formData, handleChange } = useContext(PortfolioApiData);
  const [mediaUrls, setMediaUrls] = useState(formData.media && formData.media.length > 0 ? formData.media : [{ url: '', id: null }]);

  console.log("formData-media", formData)

  useEffect(() => {
      if (formData.media && formData.media.length > 0) {
          console.log("formData-media-eff", formData)
          setMediaUrls(formData.media);
      } else {
          setMediaUrls([{ url: '', id: null }]); // Ensure at least one field is always present
      }
  }, [formData.media]);

  const handleUrlChange = (index, url, id) => {
      const updatedUrls = mediaUrls.map((item, i) =>
          i === index ? { url, id } : item
      );
      setMediaUrls(updatedUrls);
      handleChange('media', updatedUrls);
  };

  const addUrl = () => {
      setMediaUrls([...mediaUrls, { url: '', id: null }]);
  };

  const removeUrl = (index) => {
      const updatedUrls = mediaUrls.filter((_, i) => i !== index);
      setMediaUrls(updatedUrls);
      handleChange('media', updatedUrls);
  };

  return (
      <div className="col-xl-12 col-lg-12">
          {mediaUrls.map((media, index) => (
              <div key={index} className="p-field p-mb-3">
                  <label
                      htmlFor={`media-${index}`}
                      className="p-text-secondary p-d-block p-mb-2 p-font-bold"
                  >
                      Project Link {index + 1}
                  </label>
                  <div className="ls-inputicon-box">
                      <div className="">
                          <i className="fs-input-icon fa fa-address-card" />
                      </div>
                      <NewInputField
                          field={{
                              name: `media-${index}`,
                              type: 'text',
                              placeholder: 'Enter URL',
                          }}
                          value={{ [`media-${index}`]: media.url }}
                          change={(name, value) => {
                              handleUrlChange(index, value, media.id);
                          }}
                      />
                      {mediaUrls.length > 1 && (
                          <button
                              type="button"
                              onClick={() => removeUrl(index)}
                              className="site-button mb-3"
                          >
                              Remove
                          </button>
                      )}
                  </div>
              </div>
          ))}
          <button type="button" onClick={addUrl} className="site-button">
              Add URL
          </button>
      </div>
  );
}




export default PortfolioMediaForm;

{
  /* <input
          name="url"
          type="text"
          minLength={3}
          maxLength={50}
          required
          className="form-control"
          placeholder="Enter Project Link"
          value={formData.url}
          onChange={(e) => handleChange("url", e)}
          
        />
        <i className="fs-input-icon fa fa-address-card" /> */
}

import { useEffect, useState } from "react";
import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";
import { allCountries } from "country-region-data";
import SelectField from "../../../../../common/select-field";

const cities = [
  'Accra', 'Tema', 'Dodowa', 'Amasaman', 'Madina', 'Nungua', 'Lashibi', 'Teshie', 'Gbawe',
  'Kumasi', 'Obuasi', 'Konongo', 'Mampong', 'Ejisu', 'Asokore Mampong', 'Bekwai', 'Manso Nkwanta', 'Tepa',
  'Takoradi', 'Sekondi', 'Bogoso', 'Shama', 'Axim', 'Dixcove', 'Sewhi Wiawso', 'Bia East', 'Enchi',
  'Cape Coast', 'Elmina', 'Winneba', 'Saltpond', 'Agona Swedru', 'Abura', 'Ajumako', 'Mankessim',
  'Koforidua', 'Nsawam', 'Berekum', 'Akropong', 'Asamankese', 'Akyem Oda', 'Nkawkaw', 'Abetifi', 'Suhum',
  'Tamale', 'Yendi', 'Gushegu', 'Savelugu', 'Bole', 'Mankarigu', 'Zabzugu', 'Kpandai', 'Buipe',
  'Ho', 'Aflao', 'Denu', 'Hohoe', 'Keta', 'Anfoega', 'Dzodze', 'Peki', 'Nkwanta',
  'Bolgatanga', 'Bawku', 'Navrongo', 'Tongo', 'Zuarungu', 'Sandema', 'Chiana', 'Bongo', 'Fumbisi',
  'Wa', 'Tumu', 'Jirapa', 'Lawra', 'Nandom', 'Issa', 'Wechiau', 'Sissala East', 'Fian',
  'Sunyani', 'Berekum', 'Chiraa', 'Dormaa', 'Sampa', 'Wamfie', 'Kokrokoo', 'Nkrankwanta',
  'Techiman', 'Nkoranza', 'Kintampo', 'Sampa', 'Prang', 'Jema', 'Seikwa', 'Kintampo South',
  'Dambai', 'Nkwanta', 'Kete Krachi', 'Chinderi', 'Nkonya', 'Ahamansu', 'Nkonya Ahinkro',
  'Goaso', 'Kukuom', 'Nobekaw', 'Tano North', 'Asunafo', 'Asutifi', 'Kenfokrom', 'Ahenkro'
];

const StageOne = ({ forms, handleInputChange }) => {
  const [region, setRegions] = useState();
  const [city, setCity] = useState()
  const getRegionsInGhana = () => {
    const ghanaData = allCountries.find((country) => country[1] === "GH");

  
    if (ghanaData && Array.isArray(ghanaData[2])) {
      return ghanaData[2].map((region) => region[0]); // Extract only the region name
    }

    return [];
  };




  useEffect(() => {
    setRegions(getRegionsInGhana());
   setCity(cities.sort((a, b) => a.localeCompare(b)));

  }, []);


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="container text-left mx-auto">
            <div className="mx-4">
              <h4 className="twm-title text-3xl text-gray">User Information</h4>
              <span>Personal information for beeter metrics</span>
            </div>
            <div className="container text-left mt-6">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailOne[0]}
                    label={START_USER_PROFILE_FIELD.fieldDetailOne[0].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
                <div className="col-sm-12 col-md-6">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailOne[1]}
                    label={START_USER_PROFILE_FIELD.fieldDetailOne[1].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailOne[2]}
                    label={START_USER_PROFILE_FIELD.fieldDetailOne[2].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>
              <div className="row">
              <div className="col-sm-12 col-md-6">
                  <SelectField
                    noIcon={"yes"}
                    field={START_USER_PROFILE_FIELD.fieldDetailOne[4]}
                    label={START_USER_PROFILE_FIELD.fieldDetailOne[4].label}
                    options={
                      region?.length > 0 ? region : ["Loading..."]
                    }
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              <div className="col-sm-12 col-md-6">
                  <SelectField
                    noIcon={"yes"}
                    field={START_USER_PROFILE_FIELD.fieldDetailOne[3]}
                    label={START_USER_PROFILE_FIELD.fieldDetailOne[3].label}
                    options={
                      city?.length > 0 ? city : ["Loading..."]
                    }
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                    readOnly
                  />
                </div>
          
            
           
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="d-flex w-full items-center test-border">
            <img
              src="/assets/images/freelance-onboard/create-stage-one.png"
              className="img-fill-page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageOne;

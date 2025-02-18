import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

function PasswordField({ field, value, change }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleInputChange = (e) => {
    change(e);
  };

  return (
    <>
      <input
        name={field.name}
        type={isVisible ? "text" : "password"}
        required
        minLength={8}
        maxLength={20}
        className="form-control"
        placeholder={field.placeholder}
        value={value[field.name]}
        onChange={handleInputChange}
      />
      {isVisible ? (
        <div className=" eye-icon" onClick={() => setIsVisible(false)}>
          <IoMdEye size={25} />
        </div>
      ) : (
        <div className=" eye-icon" onClick={() => setIsVisible(true)}>
          <IoIosEyeOff size={25} />
        </div>
      )}
    </>
  );
}

export default PasswordField;

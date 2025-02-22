import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SUCCESS_STATUS } from "../globals/constants";

export const notify = (
  status,
  success = "Operation Successful",
  fail = "Operation failed"
) => {
  if (status == 200) {
    toast.success(success, {
      position: "top-center",
      autoClose: 3000, // You can set the duration for which the notification will be shown
    });
  } else if (status == 400) {
    toast.error(fail, {
      position: "top-center",
      autoClose: 3000, // You can set the duration for which the notification will be shown
    });
  } else {
    console.log("mind your business");
  }
};

export const topMessage = ({ status, msg, changeState }) => {
  const handleClose = () =>
    changeState({
      status: null,
      msg: null,
    });
  return (
    <div className={status ? "errorAlert" : "successAlert"}>
      <div className="inner">{msg}</div>

      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => handleClose()}
      />
    </div>
  );
};

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PaystackCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  const walletId = searchParams.get("wallet_id");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const res = await axios.get(
          `https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/api/v1/wallet/callback/${walletId}?reference=${reference}`
        );

        if (res.data.status === "success") {
          setStatus("success");
          // optionally redirect or show success UI
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Wallet topup successful",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          setStatus("fail");
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Top up failed try again",
          });
        }
        setTimeout(() => {
          navigate("/dashboard-client/client-finance-overview"); // or wherever you want
        }, 3500);
      } catch (error) {
        console.error(error);
        setStatus("error");
        setTimeout(() => {
          navigate("/wallet/fail");
        }, 2000);
      }
    };

    if (walletId && reference) {
      verifyTransaction();
    } else {
      setStatus("error");
    }
  }, [walletId, reference]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {status === "loading" && <p>Verifying payment...</p>}
      {status === "success" && <p>Payment successful! Redirecting...</p>}
      {status === "fail" && <p>Payment failed. Redirecting...</p>}
      {status === "error" && <p>Something went wrong.</p>}
    </div>
  );
};

export default PaystackCallback;
